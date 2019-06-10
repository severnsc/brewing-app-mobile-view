import React from "react";
import { shallow } from "enzyme";
import { Timers, NewTimer } from ".";
import renderer from "react-test-renderer";

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

describe("New Timer screen", () => {
  it("matches snapshot", () => {
    const newTimer = renderer.create(<NewTimer />);
    const tree = newTimer.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("returns a TextInput with autoFocus", () => {
    const newTimer = shallow(<NewTimer />);
    const input = newTimer.findWhere(n => n.prop("autoFocus") === true);
    expect(input).toHaveLength(1);
  });
  it("passes onTimerNameChange prop to autofocused TextInput onChange", () => {
    const onTimerNameChange = jest.fn();
    const newTimer = shallow(
      <NewTimer onTimerNameChange={onTimerNameChange} />
    );
    const input = newTimer.findWhere(n => n.prop("autoFocus") === true);
    expect(input.prop("onChange")).toBe(onTimerNameChange);
  });
  it("returns a timer duration TimerInput", () => {
    const newTimer = shallow(<NewTimer />);
    const input = newTimer.findWhere(
      n => n.prop("placeholder") === "Timer Duration (HH:MM:SS)"
    );
    expect(input).toHaveLength(1);
  });
  it("passes onTimerDurationChange prop to timer duration input onChange", () => {
    const onTimerDurationChange = jest.fn();
    const newTimer = shallow(
      <NewTimer onTimerDurationChange={onTimerDurationChange} />
    );
    const input = newTimer.findWhere(
      n => n.prop("placeholder") === "Timer Duration (HH:MM:SS)"
    );
    expect(input.prop("onChange")).toBe(onTimerDurationChange);
  });
  it("returns a subtitle with value Alerts", () => {
    const newTimer = shallow(<NewTimer />);
    const sub = newTimer.find("Subtitle");
    expect(sub).toHaveLength(1);
    expect(sub.prop("value")).toBe("Alerts");
  });
  it("returns an alert message TextInput", () => {
    const newTimer = shallow(<NewTimer />);
    const input = newTimer.findWhere(
      n => n.prop("placeholder") === "Alert Message"
    );
    expect(input).toHaveLength(1);
  });
  it("passes onAlertMessageChange to alert message TextInput onChange", () => {
    const onAlertMessageChange = jest.fn();
    const newTimer = shallow(
      <NewTimer onAlertMessageChange={onAlertMessageChange} />
    );
    const input = newTimer.findWhere(
      n => n.prop("placeholder") === "Alert Message"
    );
    expect(input.prop("onChange")).toBe(onAlertMessageChange);
  });
  it("returns an alert time TimerInput", () => {
    const newTimer = shallow(<NewTimer />);
    const input = newTimer.findWhere(
      n => n.prop("placeholder") === "Alert Time (HH:MM:SS)"
    );
    expect(input).toHaveLength(1);
  });
  it("passess onAlertTimeChange to the alert time TimerInput onChange", () => {
    const onAlertTimeChange = jest.fn();
    const newTimer = shallow(
      <NewTimer onAlertTimeChange={onAlertTimeChange} />
    );
    const input = newTimer.findWhere(
      n => n.prop("placeholder") === "Alert Time (HH:MM:SS)"
    );
    expect(input.prop("onChange")).toBe(onAlertTimeChange);
  });
  it("returns a circular green add button", () => {
    const newTimer = shallow(<NewTimer />);
    const button = newTimer.find("Button");
    expect(button).toHaveLength(1);
    expect(button.prop("circle")).toBe(true);
    expect(button.prop("success")).toBe(true);
    expect(button.prop("value")).toBe("+");
  });
  it("passes onPress to button", () => {
    const onPress = jest.fn();
    const newTimer = shallow(<NewTimer onPress={onPress} />);
    const button = newTimer.find("Button");
    expect(button.prop("onPress")).toBe(onPress);
  });
});
