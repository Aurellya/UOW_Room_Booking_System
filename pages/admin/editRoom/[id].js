import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import { useState } from "react";

const GET_ROOM_INFO = gql`
  query Room($id: ID!) {
    room(id: $id) {
      id
      room_no
      block
      capacity
      promo_code
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateRoom(
    $id: ID!
    $room_no: String!
    $block: String!
    $capacity: Long
    $promo_code: String!
  ) {
    updateRoom(
      input: {
        where: { id: $id }
        data: {
          room_no: $room_no
          block: $block
          capacity: $capacity
          promo_code: $promo_code
        }
      }
    ) {
      room {
        id
        room_no
        capacity
        block
        promo_code
      }
    }
  }
`;

const editRoom = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: { id: router.query.id },
  });

  const [formState, setFormState] = useState({
    room_no: "",
    block: "",
    capacity: 0,
    promo_code: "",
  });

  const [createLink] = useMutation(UPDATE_QUERY, {
    variables: {
      id: router.query.id,
      room_no: formState.room_no,
      block: formState.block,
      capacity: formState.capacity,
      promo_code: formState.promo_code,
    },
  });

  function updateRoom(e) {
    e.preventDefault();
    var room_no = document.getElementById("room_no").value.toUpperCase().trim();
    var block = document.getElementById("block").value.toUpperCase().trim();
    var capacity = document.getElementById("capacity").value.trim();
    var promo_code = document
      .getElementById("promo_code")
      .value.toUpperCase()
      .trim();

    if (room_no == "" || block == "" || capacity == "" || promo_code == "") {
      let ele = document.getElementById("warning_msg");
      ele.style.display = "block";
      return false;
    } else {
      window.setTimeout(() => {
        setFormState({
          room_no: room_no,
          block: block,
          capacity: capacity,
          promo_code: promo_code,
        });
      }, 0);
      window.setTimeout(() => {
        createLink();
      }, 0);
      window.setTimeout(() => {
        document.getElementById("add_room_form").reset();
      }, 0);
      window.setTimeout(() => {
        var ele = document.getElementById("success_msg");
        ele.style.display = "block";
      }, 0);
    }
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

  if (error) return "Error Loading Room";
  if (loading) return <h1>Loading ...</h1>;
  if (data.room) {
    const { room } = data;
    return (
      <>
        <div
          id="success_msg"
          className="container alert alert-success alert-dismissible fade show mt-5"
          role="alert"
        >
          <strong>Success!</strong> The data successfully added to the database.
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

        <div className="container col-xxl-8 px-5 py-5 my-5 rounded-3 border shadow">
          <h4 className="mb-1">Update Room [ID: #{room.id}]</h4>
          <hr className="mb-4" />
          <form id="add_room_form">
            <div className="row">
              <div className="form-group col-4">
                <label htmlFor="room_no">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="room_no"
                  defaultValue={room.room_no}
                  placeholder="Example: A 3.14"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="block">Block</label>
                <select
                  className="form-control"
                  id="block"
                  defaultValue={room.block}
                >
                  <option value="DEFAULT" disabled>
                    Block
                  </option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>
              <div className="form-group col-3">
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="text"
                  className="form-control"
                  id="capacity"
                  defaultValue={room.capacity}
                  placeholder="Capacity"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="promo_code">Promo Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="promo_code"
                  defaultValue={room.promo_code}
                  placeholder="Promo Code"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn filter-btn-sm mt-3"
                onClick={(e) => updateRoom(e)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
  return <h1>Not Found</h1>;
};

export default editRoom;
