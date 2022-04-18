import { Route, Switch } from "react-router-dom";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import Dashboard from "../components/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer />
    </>
  );
};

export default AppRoutes;
