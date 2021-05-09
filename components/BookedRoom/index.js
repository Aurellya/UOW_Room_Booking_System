/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

const QUERY = gql`
  {
    bookingSlots(where: { availability: false }) {
      id
      date
      time_start
      time_end
      price_per_hour
      promo_code
      availability
      room {
        room_no
        block
        capacity
      }
    }
  }
`;

function BookedRoom(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading bookingSlots";
  //if bookingSlots are returned from the GraphQL query, run the filter query
  //and set equal to variable bookingSlotsSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.bookingSlots && data.bookingSlots.length) {
    //searchQuery
    const searchQuery = data.bookingSlots.filter((query) =>
      query.room.room_no.toUpperCase().includes(props.search)
    );
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
                    <h4 className="my-0 fw-normal">Room ID: {res.id}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      ${res.price_per_hour}
                      <small className="text-muted fw-light">/hour</small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>Room No:{res.room.room_no}</li>
                      <li>Block: {res.room.block}</li>
                      <li>Capacity: {res.room.capacity}</li>
                      <li>Date: {res.date}</li>
                      <li>
                        Time: {res.time_start.substring(0, 5)} -{" "}
                        {res.time_end.substring(0, 5)}
                      </li>
                      <li>Promo code: {res.promo_code}</li>
                      <li>
                        Availability:{" "}
                        {res.availability ? "Available" : "Booked"}
                      </li>
                    </ul>
                    <Link as={`/rooms/${res.id}`} href={`/rooms?id=${res.id}`}>
                      <a className="w-100 btn btn-lg buttonbox">View</a>
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
export default BookedRoom;
