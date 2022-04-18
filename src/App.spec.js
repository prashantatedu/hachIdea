import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  it("should render a <div/>", () => {
    const container = shallow(<App />);
    console.log({ container });
    expect(container.find("div").length).toEqual(1);
  });
});
