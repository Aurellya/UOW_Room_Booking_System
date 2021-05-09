/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";

const QUERY = gql`
  {
    bookingSlots(where: { availability: true }) {
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

function Listing(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading Booking Slots";
  // if bookingSlots are returned from the GraphQL query, run the filter query
  // and set equal to variable bookingSlotsSearch
  if (loading) return <h1>Fetching</h1>;
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
      searchQuery = data.bookingSlots.filter((query) =>
        query.room.room_no.toUpperCase().includes(props.search)
      );
    } else {
      searchQuery = data.bookingSlots.filter(
        (query) =>
          capacity(query) && block(query) && price(query) && date(query)
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
                    }}
                  >
                    <h4 className="my-0 fw-normal">Slot ID: {res.id}</h4>
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
                    </ul>
                    <Link as={`/rooms/${res.id}`} href={`/rooms?id=${res.id}`}>
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
      return <h1>No Rooms Found</h1>;
    }
  }
  return <h5>Add Rooms</h5>;
}
export default Listing;
