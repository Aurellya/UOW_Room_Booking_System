import AppContext from "../../context/AppContext";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      input: {
        where: { id: $id }
        data: { username: $username, email: $email, password: $password }
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

const editProfile = () => {
  const { user, setUser } = useContext(AppContext);
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (user) {
      setUser_id(user.id);
    }
  }, [user]);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createLink] = useMutation(QUERY, {
    variables: {
      id: user_id,
      username: formState.username,
      email: formState.email,
      password: formState.password,
    },
  });

  function save(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let password_confirmation = document
      .getElementById("password_confirmation")
      .value.trim();

    if (
      password != password_confirmation ||
      username == "" ||
      email == "" ||
      password == "" ||
      password_confirmation == ""
    ) {
      let ele = document.getElementById("warning_msg");
      ele.style.display = "block";
      return false;
    } else {
      window.setTimeout(() => {
        setFormState({
          username: username,
          email: email,
          password: password,
        });
      }, 0);
      window.setTimeout(() => {
        createLink();
      }, 0);
      window.setTimeout(() => {
        var ele = document.getElementById("success_msg");
        ele.style.display = "block";
      }, 0);
      window.setTimeout(() => {
        window.location.replace("/admin/adminProfile");
      }, 0);
    }
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

  function showPassword() {
    let x = document.getElementById("password");
    let y = document.getElementById("password_confirmation");
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  }

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
        <strong>Invalid Input!</strong> Your submission cancelled. Check again!
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

      <div className="container col-xxl-8 px-5 py-5 my-5 rounded-3 border shadow">
        <h4 className="mb-1">Edit Profile</h4>
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
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-4">
                  <input
                    type="checkbox"
                    id="show_password"
                    name="show_password"
                    value="true"
                    onClick={showPassword}
                  />
                  <label htmlFor="show_password" className="ml-2">
                    Show Password
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn filter-btn-sm mt-2"
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
};

export default editProfile;
