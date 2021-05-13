import { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String
    $role: ID
    $confirmed: Boolean
  ) {
    createUser(
      input: {
        data: {
          username: $username
          email: $email
          password: $password
          role: $role
          confirmed: $confirmed
        }
      }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

const CreateAccount = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    confirmed: true,
  });

  const [createLink] = useMutation(QUERY, {
    variables: {
      username: formState.username,
      email: formState.email,
      password: formState.password,
      role: formState.role,
      confirmed: formState.confirmed,
    },
  });

  function save(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let role = document.getElementById("role").value.trim();
    let password = document.getElementById("password").value.trim();
    let password_confirmation = document
      .getElementById("password_confirmation")
      .value.trim();

    if (
      role == "DEFAULT" ||
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
          role: role,
          password: password,
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
        className="container alert alert-success alert-dismissible fade show mt-2"
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
        className="container alert alert-danger alert-dismissible fade show mt-2"
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

      <div className="container col-xxl-8 px-5 py-5 mt-2 mb-5 rounded-3 border shadow">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <h2 className="mb-1">Create New Account</h2>
        </div>
        <hr className="mb-4" />
        <form id="edit_form">
          <>
            <div className="row">
              <div className="form-group col-4">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="role">Role</label>
                <select
                  className="form-control"
                  id="role"
                  defaultValue="DEFAULT"
                >
                  <option value="DEFAULT" disabled>
                    Role
                  </option>
                  <option value="3">Student</option>
                  <option value="1">Staff</option>
                  <option value="4">User Admin</option>
                </select>
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
                Submit
              </button>
            </div>
          </>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
