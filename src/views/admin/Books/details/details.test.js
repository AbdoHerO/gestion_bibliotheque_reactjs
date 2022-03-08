import React from "react";
import { shallow } from "enzyme";
import Details from "./details";

describe("Details", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Details />);
    expect(wrapper).toMatchSnapshot();
  });
});
