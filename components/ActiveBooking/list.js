import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useState } from "react";

const QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      booking_rooms(sort: "booking_slot.date") {
        id
        booking_slot {
          id
          price
          date
          time_start
          time_end
          room {
            id
            room_no
            capacity
            promo_code
          }
        }
      }
    }
  }
`;

const DELETE_QUERY = gql`
  mutation DeleteBookingRoom($id: ID!) {
    deleteBookingRoom(input: { where: { id: $id } }) {
      bookingRoom {
        id
      }
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateBookingSlot($id: ID!) {
    updateBookingSlot(
      input: { data: { availability: true }, where: { id: $id } }
    ) {
      bookingSlot {
        id
        availability
        date
        time_start
        time_end
        room {
          id
          room_no
        }
      }
    }
  }
`;

function Listing(props) {
  const [formState, setFormState] = useState({
    booking_slot_id: "",
  });

  const [del_item, { del_error, del_loading }] = useMutation(DELETE_QUERY);

  const [createLink] = useMutation(UPDATE_QUERY, {
    variables: {
      id: formState.booking_slot_id,
    },
  });

  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: props.id },
  });

  function getStatus(dt) {
    var now = new Date().toISOString().split("T")[0];
    var status = dt > now;
    return status;
  }

  function cancelBooking(booking_slot_id) {
    window.setTimeout(() => {
      setFormState({
        booking_slot_id: booking_slot_id,
      });
    }, 0);
    window.setTimeout(() => {
      createLink();
    }, 0);
  }

  if (error || del_error) return "Error loading Active Booking";
  if (loading || del_loading)
    return <h1 className="text-center my-4">Fetching...</h1>;

  if (
    data != undefined &&
    data.user != null &&
    data.user.booking_rooms.length
  ) {
    var searchQuery = data.user.booking_rooms.filter(
      (query) =>
        query.booking_slot.date > new Date().toISOString().split("T")[0]
    );

    if (searchQuery.length != 0) {
      return (
        <>
          <table className="table table-striped mt-3 mb-5">
            <caption style={{ captionSide: "top" }}>
              <b>Note:</b> There won't be any refund for any cancelled booking
            </caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room No</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Capacity</th>
                <th scope="col">Promo Code</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchQuery.map((res) => (
                <tr key={res.booking_slot.id}>
                  <td>
                    <span>
                      <b>{res.booking_slot.id}</b>
                    </span>
                  </td>
                  <td>
                    <span>{res.booking_slot.room.room_no}</span>
                  </td>
                  <td>
                    <span>{res.booking_slot.price}</span>
                  </td>
                  <td>
                    <span>{res.booking_slot.date}</span>
                  </td>
                  <td>
                    <span>
                      {res.booking_slot.time_start.substr(0, 5)} -{" "}
                      {res.booking_slot.time_end.substr(0, 5)}
                    </span>
                  </td>
                  <td>
                    <span>{res.booking_slot.room.capacity}</span>
                  </td>
                  <td>
                    <span>{res.booking_slot.room.promo_code}</span>
                  </td>
                  <td
                    style={{
                      color: getStatus(res.booking_slot.date)
                        ? "green"
                        : "black",
                    }}
                  >
                    <span>
                      {getStatus(res.booking_slot.date) ? "Active" : "Expired"}
                    </span>
                  </td>
                  <td className="text-right pr-4">
                    <button
                      className="btn btn-sm btn-danger"
                      disabled={del_loading}
                      onClick={(e) => {
                        e.preventDefault();
                        cancelBooking(res.booking_slot.id);
                        del_item({
                          variables: {
                            id: res.id,
                          },
                          refetchQueries: () => [
                            { query: QUERY, variables: { id: props.id } },
                          ],
                        });
                        window.location.hash = "#active_booking";
                        window.location.reload();
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else {
      return <h2 className="text-center my-5">No Active Booking Found</h2>;
    }
  }
  return (
    <>
      <h2 className="text-center my-5">No Active Booking Found! Add Booking</h2>
    </>
  );
}

export default Listing;
