import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";
import { useEffect, useState } from "react";

const QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      cart {
        id
        booking_slots(sort: "date:desc") {
          id
          room {
            room_no
            promo_code
            capacity
          }
          date
          time_start
          time_end
          price
          availability
        }
      }
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateCart($id: ID!, $booking_slots: [ID]) {
    updateCart(
      input: { where: { id: $id }, data: { booking_slots: $booking_slots } }
    ) {
      cart {
        id
        users {
          id
          username
        }
        booking_slots {
          id
        }
      }
    }
  }
`;

function Listing(props) {
  var booking_slot_ids = [];
  const [bookingSlotId, setBookingSlotId] = useState([]);
  const [cartId, setCartId] = useState("");

  const [createLink] = useMutation(UPDATE_QUERY, {
    variables: {
      id: cartId,
      booking_slots: bookingSlotId,
    },
    refetchQueries: () => [{ query: QUERY, variables: { id: props.id } }],
  });

  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: props.id },
  });

  function useDidMount() {
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
      setDidMount(true);
    }, []);

    return didMount;
  }

  const didMount = useDidMount();

  useEffect(() => {
    if (data && data.user && data.user.cart) {
      setCartId(data.user.cart.id);
    }
  }, [data]);

  useEffect(() => {
    if (didMount) {
      createLink();
    }
  }, [bookingSlotId]);

  var sum = parseInt(0);

  function calculatePrice(price) {
    let discounted = parseFloat(
      (price - ((price * 3) / 100).toFixed(2)).toFixed(2)
    );
    sum += discounted;
    return discounted;
  }

  function cancelBooking(id) {
    window.setTimeout(() => {
      setBookingSlotId(booking_slot_ids.filter((slot_id) => slot_id != id));
    });
  }

  if (error) return "Error loading history";
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;
  if (data && data.user && data.user.cart && data.user.cart.booking_slots) {
    var searchQuery = data.user.cart.booking_slots.filter((query) =>
      query.id.includes("")
    );

    if (searchQuery.length != 0) {
      searchQuery.map((res) => {
        booking_slot_ids.push(res.id);
      });

      return (
        <>
          <br />
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h3 className="m-0">
              Order Details:{" "}
              {new Date().getFullYear() +
                "/" +
                (new Date().getMonth() + 1) +
                "/" +
                new Date().getDate()}
            </h3>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <Link href="/student/checkout" className="btn">
                  <a className="btn edit_btn">
                    <b>Checkout</b>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <table className="table table-striped mt-4 mb-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room No</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Capacity</th>
                <th scope="col">Price</th>
                <th scope="col">Promo Code</th>
                <th scope="col">Availability</th>
                <th scope="col">Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchQuery.map((res) => (
                <tr
                  key={res.id}
                  className={res.availability ? "text-dark" : "text-muted"}
                >
                  <td>
                    <span>
                      <b>{res.id}</b>
                    </span>
                  </td>
                  <td>
                    <span>{res.room.room_no}</span>
                  </td>
                  <td>
                    <span>{res.date}</span>
                  </td>
                  <td>
                    <span>
                      {res.time_start.substr(0, 5)} -{" "}
                      {res.time_end.substr(0, 5)}
                    </span>
                  </td>
                  <td>
                    <span>{res.room.capacity}</span>
                  </td>
                  <td>
                    <span>${res.price}</span>
                  </td>
                  <td>
                    <span>{res.room.promo_code}</span>
                  </td>
                  <td
                    style={{
                      color: res.availability ? "green" : "",
                    }}
                  >
                    <span>{res.availability ? "Available" : "Booked"}</span>
                  </td>
                  <td>
                    <span>${calculatePrice(res.price)}</span>
                  </td>
                  <td className="text-right pr-4">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        cancelBooking(res.id);
                      }}
                    >
                      <b>&times;</b>
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="table-active">
                <td colSpan="7"></td>
                <td>
                  <b>Total Price:</b>
                </td>
                <td>
                  <b>${sum}</b>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      );
    } else {
      return <h2 className="text-center my-5">No Item Found</h2>;
    }
  }
  return (
    <>
      <h2 className="text-center my-5">
        No Item Found! Start Add Item to Cart
      </h2>
    </>
  );
}

export default Listing;
