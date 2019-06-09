import React from "react";
import { shallow } from "enzyme";
import Timers from ".";

const timerObjects = [
  {
    id: "1",
    name: "Timer 1",
    duration: 25000,
    alerts: [
      {
        id: "1"
      },
      {
        id: "2"
      }
    ]
  },
  {
    id: "2",
    name: "Timer 2",
    duration: 129999,
    alerts: [
      {
        id: "1"
      },
      {
        id: "2"
      },
      {
        id: "3"
      }
    ]
  }
];

describe("Timers screen", () => {
  it("should return timers title", () => {
    const timers = shallow(<Timers />);
    const title = timers.find("Title");
    expect(title.prop("value")).toBe("Timers");
  });
  it("should return a FlatList", () => {
    const timers = shallow(<Timers />);
    const list = timers.find("FlatList");
    expect(list).toHaveLength(1);
  });
  it("should return a card in the list for each timer object", () => {
    const timers = shallow(<Timers timers={timerObjects} />);
    const list = timers.find("FlatList");
    const cards = list.props().data.map(list.props().renderItem);
    expect(cards).toHaveLength(2);
  });
  it("should format the card correctly", () => {
    const timers = shallow(<Timers timers={timerObjects} />);
    const list = timers.find("FlatList");
    const cards = list.props().data.map(list.props().renderItem);
    expect(cards).toMatchSnapshot();
  });
});
