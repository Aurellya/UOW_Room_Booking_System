/* components/RestaurantList/index.js */
import { BiRefresh } from "react-icons/bi";
import { useState } from "react";
import Listing from "../../components/RoomList/list";
import Link from "next/link";

function RoomList(props) {
  const [filter, setFilter] = useState(false);
  const [block, setBlock] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [err, setErr] = useState("");

  function filteringResult(e) {
    e.preventDefault();
    var block_temp = document.getElementById("rl_block").value;
    var cap = document.getElementById("rl_cap").value;
    if (isNaN(cap)) {
      setErr("Invalid Input");
      return false;
    } else {
      setErr("");
    }
    setBlock(block_temp);
    setCapacity(parseInt(cap ? cap : 0));
    setFilter(true);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        {/* unlaunched */}
        <h1 className="h2">Room List</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link href="/admin/addRoom" className="btn btn-sm button-crud">
              <a className="btn btn-sm button-crud">Add Room</a>
            </Link>
          </div>
        </div>
      </div>
      <form className="filter-box">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="rl_block">
              Block
            </label>
            <select
              className="form-control"
              id="rl_block"
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
            <label className="sr-only" htmlFor="rl_cap">
              Capacity
            </label>
            <input
              type="text"
              className="form-control"
              id="rl_cap"
              placeholder="Capacity"
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
      />
    </>
  );
}
export default RoomList;
