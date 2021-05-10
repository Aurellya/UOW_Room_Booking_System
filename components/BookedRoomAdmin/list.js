/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  {
    bookingRooms {
      id
      created_at
      booking_slot {
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
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`;

function Listing(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading bookingSlots";
  //if bookingSlots are returned from the GraphQL query, run the filter query
  //and set equal to variable bookingSlotsSearch
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;
  if (data.bookingRooms && data.bookingRooms.length) {
    //searchQuery
    var searchQuery = "";

    var capacity =
      props.capacity != 0
        ? (query) => query.booking_slot.room.capacity >= props.capacity
        : () => {
            return true;
          };
    var block =
      props.block != "DEFAULT"
        ? (query) =>
            query.booking_slot.room.block.toLowerCase().includes(props.block)
        : () => {
            return true;
          };
    var price =
      props.price != 0
        ? (query) => query.booking_slot.price <= props.price
        : () => {
            return true;
          };
    var date =
      props.date != 0
        ? (query) => query.booking_slot.date == props.date
        : () => {
            return true;
          };

    var username =
      props.username != 0
        ? (query) =>
            query.user.username
              .toUpperCase()
              .includes(props.username.toUpperCase())
        : () => {
            return true;
          };

    if (
      !props.filter &&
      props.capacity == 0 &&
      props.block == "DEFAULT" &&
      props.price == 0 &&
      props.date == 0 &&
      props.username == 0
    ) {
      searchQuery = data.bookingRooms.filter((query) =>
        query.booking_slot.room.room_no.toUpperCase().includes(props.search)
      );
    } else {
      searchQuery = data.bookingRooms.filter(
        (query) =>
          capacity(query) &&
          block(query) &&
          price(query) &&
          date(query) &&
          username(query)
      );
    }

    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="row row-cols-1 row-cols-md-3 mb-5 text-center">
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
                    }}
                  >
                    <h4 className="my-0 fw-normal">Booking ID: {res.id}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      {res.booking_slot.room.room_no}
                    </h1>
                    <ul className="list-unstyled mt-3 mb-3">
                      <li style={{ color: "red" }}>
                        <b>Price: ${res.booking_slot.price}</b>
                      </li>
                      <li>Block: {res.booking_slot.room.block}</li>
                      <li>Capacity: {res.booking_slot.room.capacity}</li>
                      <li>Date: {res.booking_slot.date}</li>
                      <li>
                        Time: {res.booking_slot.time_start.substring(0, 5)} -{" "}
                        {res.booking_slot.time_end.substring(0, 5)}
                      </li>
                      <li>Promo code: {res.booking_slot.room.promo_code}</li>
                    </ul>
                  </div>
                  <div
                    className="card-footer text-white "
                    style={{
                      backgroundColor: "#001641",
                      borderColor: "#001641",
                    }}
                  >
                    <h4 className="mt-3 mb-3 fw-normal">Booked by:</h4>
                    Username: {res.user.username} <br />
                    Email: {res.user.email} <br />
                    <br />
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
  return <h5 className="text-center my-4">Add Rooms</h5>;
}
export default Listing;
