import AppContext from "../../../context/AppContext";
import { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useRouter } from "next/router";

const GET_USER_INFO = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
      created_at
      role {
        id
        name
      }
    }
  }
`;

const QUERY = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String!
    $email: String!
    $role: ID
  ) {
    updateUser(
      input: {
        where: { id: $id }
        data: { username: $username, email: $email, role: $role }
      }
    ) {
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

const DELETE_QUERY = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(input: { where: { id: $id } }) {
      user {
        id
        username
      }
    }
  }
`;

const editAccount = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: router.query.id },
  });

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    role: "",
  });

  const [createLink] = useMutation(QUERY, {
    variables: {
      id: router.query.id,
      username: formState.username,
      email: formState.email,
      role: formState.role,
    },
  });

  const [createLink2] = useMutation(DELETE_QUERY, {
    variables: {
      id: router.query.id,
    },
  });

  function save(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let role = document.getElementById("role").value.trim();

    if (role == "DEFAULT" || username == "" || email == "") {
      let ele = document.getElementById("warning_msg");
      ele.style.display = "block";
      return false;
    } else {
      window.setTimeout(() => {
        setFormState({
          username: username,
          email: email,
          role: role,
        });
      }, 0);
      window.setTimeout(() => {
        createLink();
      }, 0);
      window.setTimeout(() => {
        remove_notif("warning_msg");
        var ele = document.getElementById("success_msg");
        ele.style.display = "block";
      }, 0);
      window.setTimeout(() => {
        window.location.replace("/user_admin/dashboard");
      }, 0);
    }
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

  function cleanDate(datetime) {
    var dt = datetime.split("T");
    let date = dt[0];
    let time = dt[1].split(".")[0];
    return date + " (" + time + ")";
  }

  function deleteAccount() {
    createLink2();
    window.location.replace("/user_admin/dashboard");
  }

  if (error) return "Error Loading Room";
  if (loading) return <h1>Loading ...</h1>;
  if (data.user) {
    const { user } = data;
    return (
      <>
        <div
          id="success_msg"
          className="container alert alert-success alert-dismissible fade show mt-5"
          role="alert"
        >
          <strong>Success!</strong> The profile is updated.
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => remove_notif("success_msg")}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          id="warning_msg"
          className="container alert alert-danger alert-dismissible fade show mt-5"
          role="alert"
        >
          <strong>Invalid Input!</strong> Your submission cancelled. Check
          again!
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => remove_notif("warning_msg")}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          id="conf_msg"
          className="container alert alert-warning alert-dismissible fade show mt-5"
          role="alert"
        >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <strong>Are you sure you want to delete this Account?</strong>

            <div>
              <button
                type="button"
                className="btn  btn-warning mr-3"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  remove_notif("conf_msg");
                  deleteAccount();
                }}
              >
                <span aria-hidden="true">
                  <strong>Yes</strong>
                </span>
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => remove_notif("conf_msg")}
              >
                <span aria-hidden="true">
                  <strong>No</strong>
                </span>
              </button>

              <button
                type="button"
                className="close"
                style={{ paddingTop: "18px" }}
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => remove_notif("conf_msg")}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container col-xxl-8 px-5 py-5 my-5 rounded-3 border shadow">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h4 className="mb-1">
              Edit Account [ID: #{user.id ? user.id : ""}]
            </h4>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button
                  className="btn-danger filter-btn-sm btn"
                  style={{ backgroundColor: "#DC3545" }}
                  onClick={(e) => {
                    let ele = document.getElementById("conf_msg");
                    ele.style.display = "block";
                  }}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>

          <hr className="mb-4" />
          <form id="edit_form">
            {user ? (
              <>
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      defaultValue={user.username}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      defaultValue={user.email}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-4">
                    <label htmlFor="role">Role</label>
                    <select
                      className="form-control"
                      id="role"
                      defaultValue={user.role.id}
                    >
                      <option value="DEFAULT" disabled>
                        Role
                      </option>
                      <option value="3">Student</option>
                      <option value="1">Staff</option>
                      <option value="4">User Admin</option>
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="created_at">Created at</label>
                    <input
                      type="text"
                      className="form-control"
                      id="created_at"
                      placeholder="Created at"
                      defaultValue={cleanDate(user.created_at)}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn filter-btn-sm mt-3"
                    onClick={(e) => save(e)}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </form>
        </div>
      </>
    );
  }
  return <h1>Not Found</h1>;
};

export default editAccount;
