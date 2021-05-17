/* components/RestaurantList/index.js */
import { useState } from "react";
import Listing from "../../components/AvailableRoom/list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { BiRefresh } from "react-icons/bi";
import Link from "next/link";

function AvailableRoom(props) {
  // const [query, updateQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [date, setDate] = useState("");
  const [block, setBlock] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [err, setErr] = useState("");

  function filteringResult(e) {
    e.preventDefault();
    let block_temp = document.getElementById("ar_block").value;
    let cap = document.getElementById("ar_cap").value;
    let price = document.getElementById("ar_price").value;
    if (isNaN(cap)) {
      setErr("Invalid Input");
      return false;
    } else {
      setErr("");
    }
    setBlock(block_temp);
    setCapacity(parseInt(cap ? cap : 0));
    setPrice(price ? price : 0);

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
        {/* launched */}
        <h1 className="h2">Available Room</h1>
        {props.staff ? (
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link href="/admin/launchRoom" className="btn btn-sm button-crud">
                <a className="btn btn-sm button-crud">Launch Room</a>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <form className="filter-box">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="ar_block">
              Block
            </label>
            <select
              className="form-control"
              id="ar_block"
              defaultValue="DEFAULT"
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

          <div className="col-auto">
            <label className="sr-only" htmlFor="ar_cap">
              Capacity
            </label>
            <input
              type="text"
              className="form-control"
              id="ar_cap"
              placeholder="Capacity"
            />
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="ar_date">
              Date
            </label>
            <div className="input-group">
              <DatePicker
                id="dp"
                className="form-control"
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="ar_date">
                  <CgCalendarDates />
                </span>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <label className="sr-only" htmlFor="ar_price">
              Max Price
            </label>
            <input
              type="text"
              className="form-control"
              id="ar_price"
              placeholder="Max Price"
            />
          </div>

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
            <button
              type="reset"
              className="btn filter-btn-sm"
              onClick={() => {
                setStartDate("");
              }}
            >
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
        btnText={props.btnText}
        staff={props.staff}
      ></Listing>
    </>
  );
}
export default AvailableRoom;
