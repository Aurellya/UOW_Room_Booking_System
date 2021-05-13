import React, { useState, useContext } from "react";
import CreateAccount from "../../components/CreateAccount";
import StaffAccount from "../../components/StaffAccount";
import StudentAccount from "../../components/StudentAccount";

function dashboard(props) {
  const [query, updateQuery] = useState("");

  const ids = ["staff_account", "student_account", "create_account"];

  function filter_cat(id) {
    var x;

    if (id == "all") {
      for (x in ids) {
        if (ids[x] != "create_account") {
          document.getElementById(ids[x]).style.display = "block";
        } else {
          document.getElementById(ids[x]).style.display = "none";
        }
      }
    } else {
      for (x in ids) {
        if (ids[x] != id) {
          document.getElementById(ids[x]).style.display = "none";
        } else {
          document.getElementById(ids[x]).style.display = "block";
        }
      }
    }
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("all")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Show All</h3>
            </div>
          </button>
        </div>

        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("staff_account")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Staff Account</h3>
            </div>
          </button>
        </div>

        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("student_account")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">
                Student Account
              </h3>
            </div>
          </button>
        </div>

        <div className="col">
          <button
            className="btn-filter w-100 card card-cover overflow-hidden text-white rounded-5 shadow-lg"
            onClick={() => filter_cat("create_account")}
          >
            <div className="w-100 d-flex flex-column h-100 text-white text-shadow-1 text-center">
              <h3 className="display-6 lh-1 fw-bold my-auto">Create Account</h3>
            </div>
          </button>
        </div>
      </div>

      <div id="staff_account" className="mb-5">
        <StaffAccount />
      </div>

      <div id="student_account">
        <StudentAccount />
      </div>

      <div id="create_account" style={{ display: "none" }}>
        {/* <h1 className="h2">Create New Account</h1>
        <hr />
        <h2 className="mb-5">None</h2> */}
        <CreateAccount />
      </div>
    </div>
  );
}

export default dashboard;
