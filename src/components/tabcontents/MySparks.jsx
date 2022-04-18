import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Idea from "../dashboard/Idea";
import "./MySparks.css";
import NewIdea from "../dashboard/NewIdea";

const MySparks = () => {
  const appContext = useContext(AppContext);
  const [isAddNewIdea, setIsAddNewIdea] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  const addIdea = () => {
    setIsAddNewIdea(true);
  };

  const closeIdea = () => {
    setIsAddNewIdea(false);
  };

  const getUserDetails = () => {
    const url = `http://localhost:3004/ideas?owner=${appContext.userDetails.userid}`;
    axios.get(url).then((res) => {
      let result = res.data;
      setLoading(false);
      if (Array.isArray(result) && !result.length) {
        console.log("no data");
      } else {
        appContext.tfDispatch({ type: "UPDATEUSERIDEA", userIdeas: result });
      }
    });
  };

  const renderIdeas = () => {
    let myIdeas = [...appContext.userDetails.userIdeas];
    if (Array.isArray(myIdeas) && !myIdeas.length) {
      return <div>No Ideas to Display</div>;
    } else {
      return myIdeas.map((myidea) => {
        return (
          <Idea
            userIdea={myidea}
            loggedUser={appContext.userDetails.userid}
            key={`Idea${myidea.id}`}
          />
        );
      });
    }
  };

  return (
    <div className="my-ideas-tab">
      <div className="myidea-header">
        <h1>Ideas and Challenges</h1>
        <div className="add-idea-btn" onClick={() => addIdea()}>
          <span>
            <i className="fas fa-plus-circle"></i>
          </span>
        </div>
      </div>

      <div className="idea-display">
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div className="ideas-container">{renderIdeas()}</div>
        )}
      </div>
      {isAddNewIdea && <NewIdea closeIdea={closeIdea} />}
    </div>
  );
};

export default MySparks;
