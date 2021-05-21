import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      booking_rooms(sort: "booking_slot.date:desc") {
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

function Listing(props) {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: props.id },
  });

  function getStatus(dt) {
    var now = new Date().toISOString().split("T")[0];
    var status = dt > now;
    return status;
  }

  if (error) return "Error loading history";
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;
  if (data.user) {
    //searchQuery
    var searchQuery = data.user.booking_rooms.filter((query) =>
      query.booking_slot.id.toUpperCase().includes("")
    );

    if (searchQuery.length != 0) {
      return (
        <>
          <table className="table table-striped mt-4 mb-5">
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
              </tr>
            </thead>
            <tbody>
              {searchQuery.map((res) => (
                <tr key={res.booking_slot.id}>
                  <th scope="row">{res.booking_slot.id}</th>
                  <td>{res.booking_slot.room.room_no}</td>
                  <td>{res.booking_slot.price}</td>
                  <td>{res.booking_slot.date}</td>
                  <td>
                    {res.booking_slot.time_start.substr(0, 5)} -{" "}
                    {res.booking_slot.time_end.substr(0, 5)}
                  </td>
                  <td>{res.booking_slot.room.capacity}</td>
                  <td>{res.booking_slot.room.promo_code}</td>
                  <td
                    style={{
                      color: getStatus(res.booking_slot.date)
                        ? "green"
                        : "black",
                    }}
                  >
                    {getStatus(res.booking_slot.date) ? "Active" : "Expired"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else {
      return <h2 className="text-center my-5">No Booking History Found</h2>;
    }
  }
  return (
    <>
      <h2 className="text-center my-5">
        No Booking History Found! Add Booking
      </h2>
    </>
  );
}

export default Listing;
