import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  {
    users {
      id
      username
      email
      last_login
      last_logout
      role {
        id
        name
      }
    }
  }
`;

function StaffAccount() {
  const { loading, error, data } = useQuery(QUERY);

  function cleanDate(datetime) {
    var dt = datetime.split("T");
    let date = dt[0];
    let time = dt[1].split(".")[0];
    return date + " (" + time + ")";
  }

  if (error) return "Error loading Staff Accounts";
  if (loading) return <h1 className="text-center my-4">Fetching...</h1>;
  if (data.users && data.users.length) {
    var searchQuery = data.users.filter((query) => query.role.id == "1");

    if (searchQuery.length != 0) {
      return (
        <>
          <h1 className="h2">Staff Account</h1>
          <hr />
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Last Login</th>
                <th scope="col">Last Logout</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchQuery.map((res) => (
                <tr key={res.id}>
                  <th scope="row">{res.id}</th>
                  <td>{res.username}</td>
                  <td>{res.email}</td>
                  <td>{res.last_login ? cleanDate(res.last_login) : "-"}</td>
                  <td>{res.last_logout ? cleanDate(res.last_logout) : "-"}</td>
                  <td className="text-center">
                    <Link
                      href={{
                        pathname: `/user_admin/editAccount/[id]`,
                        query: { id: res.id },
                      }}
                    >
                      <a className="edit_btn">Edit</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else {
      return <h1 className="text-center my-4">No Staff Account Found</h1>;
    }
  }
  return (
    <h5 className="text-center my-4">No Staff Account Found! Add Account</h5>
  );
}

export default StaffAccount;
