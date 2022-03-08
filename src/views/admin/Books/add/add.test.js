import React from "react";
import { shallow } from "enzyme";
import Add from "./add";

describe("Add", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Add />);
    expect(wrapper).toMatchSnapshot();
  });
});
