import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppContext from "./context/AppContext";
import { useReducer } from "react";

function App() {
  const [userDetails, tfDispatch] = useReducer(AppReducer, {
    isAuthenticated: false,
    userid: "",
    userIdeas: [],
    orgIdeas: [],
  });

  return (
    <Router>
      <AppContext.Provider value={{ userDetails, tfDispatch }}>
        <AppRoutes />
      </AppContext.Provider>
    </Router>
  );
}

const AppReducer = (state, action) => {
  switch (action.type) {
    case "VERIFIEDUSER":
      console.log(
        "in VERIFIEDUSER : " +
          "isAuthenticate :" +
          action.isAuthenticated +
          " name :" +
          action.userid
      );
      return {
        ...state,
        isAuthenticated: true,
        userid: action.userid,
      };
    case "UPDATEUSERIDEA":
      console.log("in UPDATEUSERIDEA : ");
      return {
        ...state,
        userIdeas: action.userIdeas,
      };
    case "UPDATEORGIDEA":
      console.log("in UPDATEORGIDEA : ");
      return {
        ...state,
        userIdeas: action.userIdeas,
      };
    case "ADDNEWIDEA":
      console.log("in ADDNEWIDEA : ");
      let temp = state.userIdeas;
      console.log({ temp });
      return {
        ...state,
        userIdeas: [...state.userIdeas, action.userIdea],
      };
    default:
      console.log("in default");
      return { ...state };
  }
};

export default App;
