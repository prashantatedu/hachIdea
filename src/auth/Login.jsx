import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import AppContext from "../context/AppContext";

const Login = () => {
  let [userid, setUserid] = useState("");
  let [useridError, setUseridError] = useState(false);
  let userContext = useContext(AppContext);

  const handleLogin = () => {
    let userIds = [];

    axios.get("http://localhost:3004/emplids").then((res) => {
      if (res.data) {
        let details = res.data;
        userIds = [...details];
        let idFound = userIds.indexOf(userid);
        if (idFound === -1) {
          setUseridError(true);
        } else {
          setUseridError(false);
          userContext.tfDispatch({ type: "VERIFIEDUSER", userid: userid });
        }
      }
    });
  };

  const handleChange = (ev) => {
    const newUserid = ev.target.value;
    setUserid(newUserid);
  };

  return (
    <div>
      <div className="login-btn">
        <form>
          <input
            type="text"
            className="input-id"
            id={userid}
            value={userid}
            placeholder="Enter your id here"
            onChange={handleChange}
          />
        </form>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
