import React, { useState, useEffect } from "react";
import "./Idea.css";
import axios from "axios";

const Idea = ({ userIdea, loggedUser }) => {
  // console.log({ userIdea });
  // console.log({ loggedUser });

  let [localVoteCount, setLocalVoteCount] = useState(userIdea.voteCount);
  let [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    console.log("from useEffect");
    checkUserVoted();
  }, []);

  const handlePut = () => {
    console.log("up button clicked");
    const url = `http://localhost:3004/ideas/${userIdea.id}`;
    let data = {
      ...userIdea,
      voteCount: userIdea.voteCount + 1,
      votedUsers: [...userIdea.votedUsers, loggedUser],
    };
    console.log({ data });
    axios
      .put(url, data)
      .then((res) => {
        console.log("success put request");
        console.log(res.data);
        setLocalVoteCount(localVoteCount + 1);
        setUserVoted(true);
      })
      .catch((error) => {
        console.log("error in put request");
        console.log(error);
      });
  };

  const checkUserVoted = () => {
    console.log("checkUserVoted");
    if (Array.isArray(userIdea.votedUsers) && !userIdea.votedUsers.length) {
      console.log("empty array");
    } else {
      for (let i = 0; i < userIdea.votedUsers.length; i++) {
        if (userIdea.votedUsers[i] === loggedUser) {
          console.log("match found for the user");
          setUserVoted(true);
          break;
        }
      }
    }
  };

  return (
    <div className="idea-display-container">
      <div className="idea-contents">
        <div className="idea-header">
          <h2>IDEA</h2>
        </div>
        <div className="idea-details">
          <div className="title-details">
            <span className="title-detail">Title </span>
            <span className="title-content">{userIdea.title}</span>
          </div>
          <div className="desc-details">
            <span className="desc-detail">Desciption</span>
            <span className="desc-content">{userIdea.description}</span>
          </div>
          <div className="title-details">
            <span className="title-detail">Tag</span>
            <span className="title-content">{userIdea.tag}</span>
          </div>
        </div>
        <div className="date-and-vote">
          <div className="date-details">
            <span>Creation Date</span>
            <span>{userIdea.createDate}</span>
          </div>
          <div className="vote-details">
            <span>Votes</span>
            <span>{localVoteCount}</span>
            {loggedUser === userIdea.owner ? null : (
              <button
                disabled={userVoted}
                onClick={handlePut}
                className={userVoted ? `vote-btn vote-btn-voted` : `vote-btn`}
              >
                <i class="fas fa-thumbs-up"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
