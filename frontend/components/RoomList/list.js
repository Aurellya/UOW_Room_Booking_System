import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";

const QUERY = gql`
  {
    rooms(sort: "room_no") {
      id
      room_no
      block
      capacity
      promo_code
      booking_slots {
        id
        availability
        booking_room {
          id
        }
      }
    }
  }
`;

const QUERY_DELETE = gql`
  mutation DeleteRoom($id: ID!) {
    deleteRoom(input: { where: { id: $id } }) {
      room {
        id
      }
    }
  }
`;

const QUERY_DELETE2 = gql`
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

const QUERY_DELETE3 = gql`
  mutation DeleteBookingRoom($id: ID!) {
    deleteBookingRoom(input: { where: { id: $id } }) {
      bookingRoom {
        id
      }
    }
  }
`;

function Listing(props) {
  const { loading, error, data } = useQuery(QUERY);

  const [del_item, { del_error, del_loading }] = useMutation(QUERY_DELETE, {
    refetchQueries: [{ query: QUERY }],
  });

  const [del_item2, { del_error2, del_loading2 }] = useMutation(QUERY_DELETE2, {
    refetchQueries: [{ query: QUERY }],
  });

  const [del_item3, { del_error3, del_loading3 }] = useMutation(QUERY_DELETE3, {
    refetchQueries: [{ query: QUERY }],
  });

  if (error) return "Error loading rooms";
  // if rooms are returned from the GraphQL query, run the filter query
  // and set equal to variable roomSearch
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;

  if (data.rooms && data.rooms.length) {
    // searchQuery
    var searchQuery = "";

    if (props.filter && props.capacity != 0 && props.block != "DEFAULT") {
      searchQuery = data.rooms.filter(
        (query) =>
          query.block.toLowerCase().includes(props.block) &&
          query.capacity >= props.capacity
      );
    } else if (props.filter && props.capacity != 0) {
      searchQuery = data.rooms.filter(
        (query) => query.capacity >= props.capacity
      );
    } else if (props.filter && props.block != "DEFAULT") {
      searchQuery = data.rooms.filter((query) =>
        query.block.toLowerCase().includes(props.block)
      );
    } else {
      searchQuery = data.rooms.filter((query) =>
        query.room_no.toUpperCase().includes(props.search)
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
                    <h4 className="my-0 fw-normal">Room ID: {res.id}</h4>
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
                            res.booking_slots.map((item) => {
                              del_item2({
                                variables: {
                                  id: item.id,
                                },
                              });

                              if (!item.availability) {
                                del_item3({
                                  variables: {
                                    id: item.booking_room.id,
                                  },
                                });
                              }
                            });
                          }, 0);

                          window.setTimeout(() => {
                            window.location.replace("/admin/dashboard");
                          }, 0);

                          window.setTimeout(() => {
                            return true;
                          }, 0);
                        } else {
                          return false;
                        }
                      }}
                      disabled={del_loading}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      {res.room_no}
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>Block: {res.block}</li>
                      <li>Capacity: {res.capacity}</li>
                      <li>Promo Code: {res.promo_code}</li>
                    </ul>
                    <Link
                      href={{
                        pathname: `/admin/editRoom/[id]`,
                        query: { id: res.id },
                      }}
                    >
                      <a className="w-100 btn btn-lg buttonbox">Edit</a>
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
  return <h5 className="text-center my-4">Add Rooms</h5>;
}
export default Listing;
