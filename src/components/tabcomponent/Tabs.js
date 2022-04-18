import React, { useState } from "react";
import MyOrgIdeas from "../tabcontents/MyOrgIdeas";
import MySparks from "../tabcontents/MySparks";
import "./Tabs.css";

const Tabs = () => {
  const tabs = ["MY IDEAS", "ALL IDEAS"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  let firstTab = tabs[0];

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="ideas-tabs">
      <ul className="tabs-select">
        {tabs.map((tab) => {
          return (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTab(tab)}
            >
              {tab}
            </li>
          );
        })}
        {/* <li>MY IDEAS</li>
        <li>ALL IDEAS</li> */}
      </ul>
      <div className="idea-tab-contents">
        {activeTab === firstTab ? <MySparks /> : <MyOrgIdeas />}
      </div>
    </div>
  );
};

export default Tabs;
