import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AppContext from "../../context/AppContext";
import Head from "next/head";

const QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      cart {
        id
        booking_slots(sort: "date:desc") {
          id
          room {
            room_no
            promo_code
            capacity
          }
          date
          time_start
          time_end
          price
          availability
        }
      }
    }
  }
`;

const ADD_QUERY = gql`
  mutation CreateBookingRoom($user: ID, $booking_slot: ID) {
    createBookingRoom(
      input: { data: { user: $user, booking_slot: $booking_slot } }
    ) {
      bookingRoom {
        id
        user {
          id
          username
        }
        booking_slot {
          id
        }
      }
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateBookingSlot($id: ID!) {
    updateBookingSlot(
      input: { data: { availability: false }, where: { id: $id } }
    ) {
      bookingSlot {
        id
        availability
        date
        time_start
        time_end
        room {
          id
          room_no
        }
      }
    }
  }
`;

const UPDATE_QUERY2 = gql`
  mutation UpdateCart($id: ID!, $booking_slots: [ID]) {
    updateCart(
      input: { where: { id: $id }, data: { booking_slots: $booking_slots } }
    ) {
      cart {
        id
        users {
          id
          username
        }
        booking_slots {
          id
        }
      }
    }
  }
`;

const checkout = () => {
  var sum = parseInt(0);
  const { user, setUser } = useContext(AppContext);
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (user) {
      setUser_id(user.id);
    }
  }, [user]);

  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: user_id },
  });

  const [cartId, setCartId] = useState("");
  const [prevSlotId, setPrevSlotId] = useState([]);
  const [bookingSlotId, setBookingSlotId] = useState("");

  useEffect(() => {
    if (data && data.user && data.user.cart) {
      setCartId(data.user.cart.id);
      let arr = [];
      data.user.cart.booking_slots.forEach((bs) => {
        arr.push(bs.id);
      });
      setPrevSlotId(arr);
    }
  }, [data]);

  const [createLink] = useMutation(ADD_QUERY, {
    variables: {
      user: user_id,
      booking_slot: bookingSlotId,
    },
  });

  const [createLink2] = useMutation(UPDATE_QUERY, {
    variables: {
      id: bookingSlotId,
    },
  });

  const [createLink3] = useMutation(UPDATE_QUERY2, {
    variables: {
      id: cartId,
      booking_slots: [],
    },
  });

  function pay(e) {
    e.preventDefault();

    // validate
    window.setTimeout(() => {
      var name = document.getElementById("name").value;
      var card_no = document.getElementById("card_no").value;
      var exp_month = document.getElementById("expiryMonth").value;
      var exp_year = document.getElementById("expiryYear").value;
      var cvc = document.getElementById("cv_code").value;

      var letters = /^[A-Za-z]+$/;
      var numbers = /^[0-9]+$/;
      var today = new Date();
      var someday = new Date();
      someday.setFullYear(exp_year, exp_month, 1);
      let ele = document.getElementById("warning_msg");

      if (
        !name.match(letters) ||
        !card_no.match(numbers) ||
        !exp_month.match(numbers) ||
        !exp_year.match(numbers) ||
        exp_month.length != 2 ||
        exp_year.length != 4 ||
        someday < today ||
        !cvc.match(numbers) ||
        cvc.length != 3
      ) {
        ele.style.display = "block";
        return false;
      } else {
        // update database
        // adding all in cart to user db and make payed room to be unavailable
        var x;
        for (x in prevSlotId) {
          setBookingSlotId(prevSlotId[x]);
          createLink();
          createLink2();
        }
        // remove everything in cart
        createLink3();

        // show success msg
        ele.style.display = "none";
        let ele2 = document.getElementById("success_msg");
        ele2.style.display = "block";

        // redirect
        window.location.href = "/student/dashboard#active_booking";
      }
    }, 0);
  }

  function remove_notif(el) {
    let x = document.getElementById(el);
    x.style.display = "none";
  }

  function calculatePrice(price) {
    let discounted = parseFloat(
      (price - ((price * 3) / 100).toFixed(2)).toFixed(2)
    );
    sum += discounted;
    return discounted;
  }

  if (error) return "Error Loading Room";
  if (loading) return <h1>Loading ...</h1>;

  if (data.user && data.user.cart && data.user.cart.length != 0) {
    // const { booking_slots } = data.user.cart;
    var searchQuery = data.user.cart.booking_slots.filter((query) =>
      query.id.includes("")
    );

    if (searchQuery.length != 0) {
      return (
        <>
          <Head>
            <title>Checkout | UOW Room Booking System</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <div
            id="success_msg"
            className="container alert alert-success alert-dismissible fade show mt-5"
            role="alert"
          >
            <strong>Success!</strong> Your Booking Payment successfully
            submitted.
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
            <strong>Failed!</strong> Your Input is Invalid! Check Again!
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
            <h3 className="mb-1 ">Payment Gateway</h3>
            <hr className="mb-4" />
            <form id="launch_room_form">
              <div className="row">
                <div className="col-6">
                  <div className="border p-4">
                    <h4>Enter your Details:</h4>
                    <hr />

                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="name">Name on Card:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="card_no">Card Number:</label>
                        <div class="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="card_no"
                            placeholder="**** **** **** ****"
                            required
                          />
                          <span class="input-group-addon">
                            <span class="glyphicon glyphicon-lock"></span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-5">
                        <label for="expiryMonth">EXPIRY DATE</label>
                        <div className="row">
                          <div class="col-6">
                            <input
                              type="text"
                              class="form-control"
                              id="expiryMonth"
                              placeholder="MM"
                              required
                            />
                          </div>
                          <div class="col-6">
                            <input
                              type="text"
                              class="form-control"
                              id="expiryYear"
                              placeholder="YYYY"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-3">
                        <label for="cvCode">CV CODE</label>
                        <input
                          type="password"
                          class="form-control"
                          id="cv_code"
                          placeholder="CV"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn filter-btn-sm mt-3"
                      style={{ padding: "6px 24px" }}
                      onClick={(e) => pay(e)}
                    >
                      Pay
                    </button>
                  </div>
                </div>

                <div className="col-6">
                  <table className="table table-striped mt-2 mb-5">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room No</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchQuery.map((res) => (
                        <tr key={res.id}>
                          <td>
                            <span>
                              <b>{res.id}</b>
                            </span>
                          </td>
                          <td>
                            <span>{res.room.room_no}</span>
                          </td>

                          <td>
                            <span>${res.price}</span>
                          </td>
                          <td>
                            <span>3%</span>
                          </td>

                          <td>
                            <span>${calculatePrice(res.price)}</span>
                          </td>
                        </tr>
                      ))}
                      <tr className="table-active">
                        <td colSpan="3"></td>
                        <td>
                          <b>Total Price:</b>
                        </td>
                        <td>
                          <b>${sum}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </>
      );
    } else {
      return <h1>Not Found</h1>;
    }
  }
  return <h1>Not Found</h1>;
};

export default checkout;
