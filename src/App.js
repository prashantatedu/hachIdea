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
      return {
        ...state,
        isAuthenticated: true,
        userid: action.userid,
      };
    case "UPDATEUSERIDEA":
      return {
        ...state,
        userIdeas: action.userIdeas,
      };
    case "UPDATEORGIDEA":
      return {
        ...state,
        userIdeas: action.userIdeas,
      };
    case "ADDNEWIDEA":
      return {
        ...state,
        userIdeas: [...state.userIdeas, action.userIdea],
      };
    default:
      return { ...state };
  }
};

export default App;
