import React from "react";
import { View } from "react-native";
import { Icon } from "../../components";
import { shallow } from "enzyme";
import { Timers, NewTimer, Timer } from ".";
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

const alerts = [
  { id: "1", message: "Add bittering hops", activationTime: 3600000 },
  { id: "2", message: "Sanitize chiller", activationTime: 300000 },
  { id: "3", message: "Add whirlpool hops", activationTime: 0 }
];

describe("Timer screen", () => {
  it("returns a title equal to the title prop", () => {
    const title = "Hop Candy NEIPA";
    const timer = shallow(<Timer title={title} />).dive();
    const titleComponent = timer.find("Title");
    expect(titleComponent).toHaveLength(1);
    expect(titleComponent.prop("value")).toBe(title);
  });
  it("returns a small Clock with ms equal to duration", () => {
    const duration = 120000000;
    const timer = shallow(<Timer duration={duration} />).dive();
    const clock = timer.find("Clock");
    expect(clock).toHaveLength(1);
    expect(clock.prop("size")).toBe("sm");
    expect(clock.prop("ms")).toBe(duration);
  });
  it("returns an edit button", () => {
    const icon = <Icon name="md-create" />;
    const timer = shallow(<Timer />)
      .dive()
      .dive();
    const button = timer.findWhere(n => n.prop("testID") === "editButton");
    expect(button).toHaveLength(1);
    expect(button.prop("circle")).toBe(true);
    expect(button.prop("primary")).toBe(true);
    expect(button.prop("value")).toEqual(icon);
  });
  it("returns a delete timer button", () => {
    const timer = shallow(<Timer />).dive();
    const button = timer.findWhere(n => n.prop("value") === "Delete timer");
    expect(button).toHaveLength(1);
    expect(button.prop("danger")).toBe(true);
  });
  it("returns a subtitle with the alert count", () => {
    const timer = shallow(<Timer alerts={alerts} />).dive();
    const sub = timer.find("Subtitle");
    expect(sub).toHaveLength(1);
    expect(sub.prop("value")).toBe("3 alerts");
  });
  it("returns a FlatList of alerts", () => {
    const separator = () => (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#000"
        }}
      />
    );
    const timer = shallow(<Timer alerts={alerts} />).dive();
    const list = timer.find("FlatList");
    expect(list).toHaveLength(1);
    expect(list.prop("ItemSeparatorComponent")()).toEqual(separator());
    const listItems = list.prop("data").map(list.prop("renderItem"));
    expect(listItems).toMatchSnapshot();
  });
  it("reutrns an Activate Timer button", () => {
    const timer = shallow(<Timer />).dive();
    const button = timer.findWhere(n => n.prop("value") === "Activate Timer");
    expect(button).toHaveLength(1);
    expect(button.prop("success")).toBe(true);
  });
  describe("editing mode", () => {
    const title = "Hop Candy NEIPA";
    const duration = 5400000;
    const onAlertMessageChange = jest.fn();
    const onAlertTimeChange = jest.fn();
    const addAlertRow = jest.fn();
    const timer = shallow(
      <Timer
        title={title}
        duration={duration}
        alerts={alerts}
        onAlertMessageChange={onAlertMessageChange}
        onAlertTimeChange={onAlertTimeChange}
        isEditing={true}
        addAlertRow={addAlertRow}
      />
    );
    const timerComponent = timer.dive();
    it("is in editing mode when isEditing is true", () => {
      const inputs = timerComponent.find("TextInput");
      expect(inputs.length > 0).toBe(true);
    });
    it("returns a TextInput with value equal to title prop", () => {
      const input = timerComponent.findWhere(n => n.prop("value") === title);
      expect(input).toHaveLength(1);
    });
    it("returns a TimerInput with value equal to duration", () => {
      const input = timerComponent.findWhere(n => n.prop("value") === duration);
      expect(input).toHaveLength(1);
    });
    it("returns a subtitle with total alert count", () => {
      const sub = timerComponent.find("Subtitle");
      expect(sub).toHaveLength(1);
      expect(sub.prop("value")).toBe("3 alerts");
    });
    it("returns a FlatList of alert inputs", () => {
      const list = timerComponent.find("FlatList");
      expect(list).toHaveLength(1);
      const items = list.prop("data").map(list.prop("renderItem"));
      expect(items).toMatchSnapshot();
    });
    it("passes onAlertMessageChange to alert input", () => {
      const list = timerComponent.find("FlatList");
      expect(list).toHaveLength(1);
      const items = list.prop("data").map(list.prop("renderItem"));
      const input = items[0].props.children.props.children[0];
      expect(input.props.onChange).toBe(onAlertMessageChange);
    });
    it("passess onAlertTimeChange to alert input", () => {
      const list = timerComponent.find("FlatList");
      expect(list).toHaveLength(1);
      const items = list.prop("data").map(list.prop("renderItem"));
      const input = items[0].props.children.props.children[1];
      expect(input.props.onChange).toBe(onAlertTimeChange);
    });
    it("returns an add button", () => {
      const icon = <Icon name="ios-add-circle" />;
      const button = timerComponent.find("Button");
      expect(button).toHaveLength(1);
      expect(button.prop("circle")).toBe(true);
      expect(button.prop("success")).toBe(true);
      expect(button.prop("value")).toEqual(icon);
    });
    it("calls addAlertRow", () => {
      const button = timerComponent.find("Button");
      button.props().onPress();
      expect(addAlertRow).toHaveBeenCalled();
    });
  });
});
