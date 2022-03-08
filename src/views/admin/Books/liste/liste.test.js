import React from "react";
import { shallow } from "enzyme";
import Liste from "./liste";

describe("Liste", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Liste />);
    expect(wrapper).toMatchSnapshot();
  });
});
