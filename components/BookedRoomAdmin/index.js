import { useState } from "react";
import Listing from "../../components/BookedRoomAdmin/list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { BiRefresh } from "react-icons/bi";

function BookedRoomAdmin(props) {
  const [filter, setFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [date, setDate] = useState("");
  const [block, setBlock] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");

  function filteringResult(e) {
    e.preventDefault();
    let block_temp = document.getElementById("block").value.toUpperCase();
    let cap = document.getElementById("cap").value;
    let price = document.getElementById("price").value;
    let username = document.getElementById("username").value;
    if (isNaN(cap)) {
      setErr("Invalid Input");
      return false;
    } else {
      setErr("");
    }
    setBlock(block_temp);
    setCapacity(parseInt(cap ? cap : 0));
    setPrice(price ? price : 0);
    setUsername(username ? username : 0);

    // sanitize date input
    if (startDate != null) {
      var months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      var dates = startDate.toString().split(" ");
      var full_date = dates[3] + "-" + months[dates[1]] + "-" + dates[2];
    }

    setDate(startDate ? full_date : 0);
    setFilter(true);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
        {/* booked */}
        <h1 className="h2">Booked Room</h1>
      </div>

      <form className="filter-box">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="block">
              Block
            </label>
            <select className="form-control" id="block" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled>
                Block
              </option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="cap">
              Capacity
            </label>
            <input
              type="text"
              className="form-control"
              id="cap"
              placeholder="Capacity"
            />
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="date">
              Date
            </label>
            <div className="input-group">
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="date">
                  <CgCalendarDates />
                </span>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="price">
              Max Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Max Price"
            />
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="username">
              Booked by
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Booked By"
            />
          </div>
        </div>
        <br />
        <div className="form-row align-items-center">
          <div className="col-auto">
            <button
              type="submit"
              className="btn filter-btn-sm"
              onClick={(e) => filteringResult(e)}
            >
              Filter
            </button>
          </div>
          <div className="col-auto">
            <button type="reset" className="btn filter-btn-sm">
              <BiRefresh style={{ marginBottom: "2px" }} fontSize="22" />
            </button>
          </div>
        </div>
        {err ? (
          <p style={{ color: "red", paddingTop: "30px" }}>{err}</p>
        ) : (
          <></>
        )}
      </form>

      <Listing
        search={props.search}
        filter={filter}
        block={block}
        capacity={capacity}
        price={price}
        date={date}
        username={username}
      ></Listing>
    </>
  );
}
export default BookedRoomAdmin;
