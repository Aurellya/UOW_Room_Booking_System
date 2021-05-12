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
    }
  }
`;

const QUERY_DELETE = gql`
  mutation DeleteRoom($id: ID!) {
    deleteRoom(input: { where: { id: $id } }) {
      room {
        room_no
      }
    }
  }
`;

function Listing(props) {
  const { loading, error, data } = useQuery(QUERY);

  const [del_item, { del_error, del_loading }] = useMutation(QUERY_DELETE, {
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
                      onClick={() =>
                        del_item({
                          variables: {
                            id: res.id,
                          },
                        })
                      }
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
