import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Idea from "../dashboard/Idea";
import "./MyOrgIdeas.css";

const MyOrgIdeas = () => {
  let [loading, setLoading] = useState(true);
  let [allUserIdeas, setAllUserIdeas] = useState([]);
  let [userIdeasByVoteCount, setUserIdeasByVoteCount] = useState([]);
  let [userIdeasByCreateDate, setUserIdeasByCreateDate] = useState([]);

  let [sortOption, setSortOption] = useState("Sort AS-IS");
  let [userRecords, setUserRecords] = useState({
    startCount: 0,
    limitRecords: 6,
  });

  let { startCount, limitRecords } = userRecords;

  const appContext = useContext(AppContext);
  let usersByVoteCall = [];
  let usersByDate = [];
  let orgIdeas = [];

  useEffect(() => {
    getUserDetails();
    getAllUserIdeas();
  }, []);

  const getAllUserIdeas = () => {
    console.log("getAllUserIdeas");
    const url = `http://localhost:3004/ideas`;
    console.log({ url });
    axios.get(url).then((res) => {
      let result = res.data;
      console.log({ result });
      setLoading(false);

      if (Array.isArray(result) && !result.length) {
        console.log("no data");
      } else {
        console.log({ result });
        setAllUserIdeas([...result]);
      }
      sortByVotes();
      sortByCreateDate();
      setUserIdeasByVoteCount(usersByVoteCall);
      setUserIdeasByCreateDate(usersByDate);
    });
    console.log({ usersByVoteCall });
  };

  const getUserDetails = () => {
    const url = `http://localhost:3004/ideas?_start=${startCount}&_limit=${limitRecords}`;
    console.log({ url });
    axios.get(url).then((res) => {
      let result = res.data;
      console.log({ result });
      setLoading(false);
      if (Array.isArray(result) && !result.length) {
        console.log("no data");
      } else {
        console.log({ result });
        appContext.tfDispatch({ type: "UPDATEORGIDEA", orgIdeas: result });
      }
    });
  };

  const sortByVotes = () => {
    console.log("sortByVotes");
    usersByVoteCall = [...allUserIdeas];
    usersByVoteCall.sort(compareVote);
    console.log({ usersByVoteCall });
  };

  const sortByCreateDate = () => {
    console.log("sortByCreateDate");
    usersByDate = [...allUserIdeas];
    usersByDate.sort(compareDate);
    console.log({ usersByDate });
  };

  const compareDate = (a, b) => {
    let firstDate = new Date(a.createDate);
    let secondDate = new Date(b.createDate);
    return firstDate.getTime() - secondDate.getTime();
  };

  const compareVote = (a, b) => {
    if (a.voteCount < b.voteCount) {
      return -1;
    }
    if (a.voteCount > b.voteCount) {
      return 1;
    }
    return 0;
  };

  const renderIdeas = () => {
    console.log("renderIdeas");
    switch (sortOption) {
      case "createDate":
        console.log("sort createdate");
        sortByCreateDate();
        console.log({ userIdeasByCreateDate });
        orgIdeas = userIdeasByCreateDate.slice(
          startCount,
          startCount + limitRecords
        );
        console.log({ orgIdeas });
        // orgIdeas = [...usersByDate];
        break;
      case "voteCount":
        console.log("sort votecount");
        sortByVotes();
        console.log({ userIdeasByVoteCount });
        orgIdeas = userIdeasByVoteCount.slice(
          startCount,
          startCount + limitRecords
        );
        console.log({ orgIdeas });
        // orgIdeas = [...usersByVoteCall];
        break;
      default:
        console.log("sort default");
        orgIdeas = allUserIdeas.slice(startCount, startCount + limitRecords);
        console.log({ orgIdeas });
        break;
    }
    console.log({ orgIdeas });
    if (Array.isArray(orgIdeas) && !orgIdeas.length) {
      return <div>No Ideas to Display</div>;
    } else {
      return orgIdeas.map((orgIdea) => {
        return (
          <Idea
            userIdea={orgIdea}
            loggedUser={appContext.userDetails.userid}
            key={`org${orgIdea.id}`}
          />
        );
      });
    }
  };

  const inputValueChange = (ev) => {
    setSortOption(ev.target.value);
  };

  const moveRight = () => {
    console.log("moveRight");
    let newStart = startCount + limitRecords;
    console.log(allUserIdeas.length);
    console.log(newStart + 1);
    if (allUserIdeas.length >= newStart + 1) {
      setUserRecords({ ...userRecords, startCount: startCount + limitRecords });
    }
  };

  const moveLeft = () => {
    console.log("moveLeft");
    let newStart = startCount - limitRecords;
    console.log(allUserIdeas.length);
    console.log(newStart + 1);
    if (newStart >= 0) {
      setUserRecords({ ...userRecords, startCount: startCount - limitRecords });
    }
  };

  return (
    <div>
      <div className="my-ideas-tab">
        <div className="org-header">
          <h1>Company Ideas and Challenges</h1>
          <select
            className="sort-option"
            id="sortopt"
            value={sortOption}
            onChange={(e) => inputValueChange(e)}
          >
            <option value="None">None</option>
            <option value="createDate">Create Date</option>
            <option value="voteCount">Vote Count</option>
          </select>
          <span className="right-more" onClick={moveLeft}>
            <i class="fas fa-caret-left"></i>
          </span>
          <span className="left-more" onClick={moveRight}>
            <i class="fas fa-caret-right"></i>
          </span>
        </div>

        <div className="idea-display">
          {loading ? (
            <div>Loading..</div>
          ) : (
            <div className="ideas-container">{renderIdeas()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrgIdeas;
