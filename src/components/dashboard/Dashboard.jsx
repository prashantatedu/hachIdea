import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Tabs from "../tabcomponent/Tabs";
import Idea from "./Idea";
import NewIdea from "./NewIdea";
import "./Dashboard.css";

const Dashboard = () => {
  const [isAddNewIdea, setIsAddNewIdea] = useState(false);
  const appContext = useContext(AppContext);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = (authToken) => {
    const url = `http://localhost:3004/ideas?owner=${appContext.userDetails.userid}`;
    axios.get(url).then((res) => {
      let result = res.data;
      if (Array.isArray(result) && !result.length) {
        console.log("no data");
      } else {
        appContext.tfDispatch({ type: "UPDATEUSERIDEA", userIdeas: result });
      }
    });
  };

  const addIdea = () => {
    setIsAddNewIdea(true);
  };

  const closeIdea = () => {
    setIsAddNewIdea(false);
  };

  if (!appContext.userDetails.isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="idea-containers-tab">
      <Tabs />
      {/* <ul>
        <li>
          <div className="add-idea-btn" onClick={() => addIdea()}>
            <span>
              <i className="fas fa-plus-circle"></i>
            </span>
          </div>
        </li>
      </ul> */}
    </div>
  );
};

export default Dashboard;
