import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";

const QUERY = gql`
  {
    bookingSlots(where: { availability: true }, sort: "room.room_no") {
      id
      date
      time_start
      time_end
      price
      availability
      room {
        room_no
        block
        capacity
        promo_code
      }
    }
  }
`;

const QUERY_DELETE = gql`
  mutation DeleteBookingSlot($id: ID!) {
    deleteBookingSlot(input: { where: { id: $id } }) {
      bookingSlot {
        id
        room {
          room_no
        }
      }
    }
  }
`;

function Listing(props) {
  const { loading, error, data } = useQuery(QUERY);

  const [del_item, { del_error, del_loading }] = useMutation(QUERY_DELETE, {
    refetchQueries: [{ query: QUERY }],
  });

  function getStatus(dt) {
    var now = new Date().toISOString().split("T")[0];
    var status = dt > now;
    return status;
  }

  if (error) return "Error loading Booking Slots";
  // if bookingSlots are returned from the GraphQL query, run the filter query
  // and set equal to variable bookingSlotsSearch
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;
  if (data.bookingSlots && data.bookingSlots.length) {
    // searchQuery
    var searchQuery = "";

    var capacity =
      props.capacity != 0
        ? (query) => query.room.capacity >= props.capacity
        : () => {
            return true;
          };
    var block =
      props.block != "DEFAULT"
        ? (query) => query.room.block.toLowerCase().includes(props.block)
        : () => {
            return true;
          };
    var price =
      props.price != 0
        ? (query) => query.price <= props.price
        : () => {
            return true;
          };
    var date =
      props.date != 0
        ? (query) => query.date == props.date
        : () => {
            return true;
          };

    if (
      !props.filter &&
      props.capacity == 0 &&
      props.block == "DEFAULT" &&
      props.price == 0 &&
      props.date == 0
    ) {
      searchQuery = data.bookingSlots.filter(
        (query) =>
          query.room.room_no.toUpperCase().includes(props.search) &&
          new Date(query.date) >= new Date()
      );
    } else {
      searchQuery = data.bookingSlots.filter(
        (query) =>
          capacity(query) &&
          block(query) &&
          price(query) &&
          date(query) &&
          new Date(query.date) >= new Date()
      );
    }

    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {searchQuery.map((res) => (
              <div className="col" key={res.id}>
                <div
                  className="card mb-4 rounded-3 shadow-sm"
                  style={{
                    borderColor: "#001641",
                  }}
                >
                  <div
                    className="card-header py-3 text-white "
                    style={{
                      backgroundColor: "#001641",
                      borderColor: "#001641",
                      position: "relative",
                    }}
                  >
                    <h4 className="my-0 fw-normal">Slot ID: {res.id}</h4>
                    <button
                      aria-hidden="true"
                      className="deleteItem_btn"
                      onClick={(e) => {
                        e.preventDefault();

                        if (
                          confirm("Are you sure want to delete this?") == true
                        ) {
                          window.setTimeout(() => {
                            del_item({
                              variables: {
                                id: res.id,
                              },
                            });
                          }, 0);

                          window.setTimeout(() => {
                            return true;
                          }, 0);
                        } else {
                          return false;
                        }
                      }}
                      disabled={del_loading}
                      style={{
                        display: props.staff == "staff" ? "block" : "none",
                      }}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      {res.room.room_no}
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li style={{ color: "red" }}>
                        <b>Price: ${res.price}</b>
                      </li>
                      <li>Capacity: {res.room.capacity}</li>
                      <li>Date: {res.date}</li>
                      <li>
                        Time: {res.time_start.substring(0, 5)} -{" "}
                        {res.time_end.substring(0, 5)}
                      </li>
                      <li>Promo code: {res.room.promo_code}</li>
                      <li
                        style={{ color: res.availability ? "green" : "black" }}
                      >
                        Availability:{" "}
                        {res.availability ? "Available" : "Booked"}
                      </li>
                      <li
                        style={{
                          display: props.staff == "staff" ? "block" : "none",
                        }}
                      >
                        <br />
                        Status:{" "}
                        <span
                          style={{
                            color: getStatus(res.date) ? "green" : "red",
                          }}
                        >
                          <b>{getStatus(res.date) ? "Active" : "Expired"}</b>
                        </span>
                      </li>
                    </ul>
                    <Link
                      href={{
                        pathname:
                          props.staff == "staff"
                            ? `/admin/editSlot/[id]`
                            : `/student/confirmBook/[id]`,
                        query: { id: res.id },
                      }}
                    >
                      <a className="w-100 btn btn-lg buttonbox">
                        {props.btnText}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <h1 className="text-center my-4">No Rooms Found</h1>;
    }
  }
  return <h5 className="text-center my-4">No Rooms Found! Add Rooms</h5>;
}
export default Listing;
