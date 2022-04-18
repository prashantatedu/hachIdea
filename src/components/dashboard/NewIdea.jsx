import React, { useContext, useState } from "react";
import "./NewIdea.css";
import Modal from "../modals/Modal";
import AppContext from "../../context/AppContext";
import axios from "axios";

const NewIdea = ({ closeIdea }) => {
  const appContext = useContext(AppContext);
  let todayDate = new Date();
  let currentDate = todayDate.toISOString().split("T")[0];
  let [ideaData, setIdeaData] = useState({
    owner: appContext.userDetails.userid,
    title: "",
    description: "",
    tag: "",
    voteCount: 0,
    createDate: currentDate,
    votedUsers: [],
  });

  const handleIdea = (e) => {
    e.preventDefault();
    let result = checkIdeas();
    if (!result) {
      axios.post("http://localhost:3004/ideas/", ideaData).then((response) => {
        console.log(response.status);
        console.log(response.data);
        appContext.tfDispatch({ type: "ADDNEWIDEA", userIdea: ideaData });
        closeIdea();
      });
    }
  };

  const checkIdeas = () => {
    let userIdeas = appContext.userDetails.userIdeas;
    if (!userIdeas.length) {
      return false;
    } else {
      for (let i = 0; i < userIdeas.length; i++) {
        let obj = userIdeas[i];
        if (obj["title"] === ideaData.title) {
          return true;
        }
      }
      return false;
    }
  };

  const handleCloseIdea = () => {
    closeIdea();
  };

  const inputValueChange = (ev) => {
    setIdeaData({ ...ideaData, [ev.target.id]: ev.target.value });
  };

  return (
    <Modal closeModal={handleCloseIdea}>
      <div className="idea-content">
        <div className="form-header">
          <h1>Idea / Challenge</h1>
          <span onClick={() => handleCloseIdea()}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <form className="user-idea-in">
          <input
            className="userIdeaInput"
            type="text"
            id="title"
            value={ideaData.title}
            onChange={(e) => inputValueChange(e)}
            required
            placeholder="Title"
          />

          <input
            className="userIdeaInput"
            type="text"
            id="description"
            value={ideaData.description}
            onChange={(e) => inputValueChange(e)}
            required
            placeholder="Description"
          />

          <select
            className="userIdeaInput"
            id="tag"
            value={ideaData.tag}
            onChange={(e) => inputValueChange(e)}
          >
            <option value="None">None</option>
            <option value="feature">Feature</option>
            <option value="skill">Skill</option>
            <option value="tech">Tech</option>
          </select>
          <button className="idea-btn" onClick={(e) => handleIdea(e)}>
            ADDIDEA
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NewIdea;
