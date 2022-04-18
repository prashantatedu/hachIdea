import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Login from "../auth/Login";
import AppContext from "../context/AppContext";
import "./Home.css";

const Home = () => {
  const appContext = useContext(AppContext);

  if (appContext.userDetails.isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div className="home-container">
      <div className="home-items">
        <img src="hackimage.jpeg" alt="hackimg" />
      </div>
      <Login />
    </div>
  );
};

export default Home;
