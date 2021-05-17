import Listing from "./list";
import AppContext from "../.././context/AppContext";
import { useContext, useState, useEffect } from "react";

function ActiveBooking() {
  const { user, setUser } = useContext(AppContext);

  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    if (user) {
      setUser_id(user.id);
    }
  }, [user]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
        <h1 className="h2">My Active Booked Room</h1>
      </div>
      <Listing id={user_id} />
    </>
  );
}

export default ActiveBooking;
