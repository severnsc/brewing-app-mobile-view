import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Dashboard from ".";

const needsToBeReordered = [
  {
    id: "1",
    object: {
      name: "California Ale"
    },
    unitCost: 16,
    costUnit: "USD",
    currentQuantity: 1,
    quantityUnit: null,
    reorderQuantity: 2
  },
  {
    id: "2",
    object: {
      name: "English Ale"
    },
    unitCost: 10,
    costUnit: "USD",
    currentQuantity: 2,
    quantityUnit: null,
    reorderQuantity: 4
  }
];

const upcomingDeliveries = [
  {
    id: "1",
    object: {
      name: "California Ale"
    },
    unitCost: 16,
    costUnit: "USD",
    currentQuantity: 1,
    quantityUnit: null,
    reorderQuantity: 2,
    deliveryDate: "10/12/19"
  },
  {
    id: "2",
    object: {
      name: "English Ale"
    },
    unitCost: 10,
    costUnit: "USD",
    currentQuantity: 2,
    quantityUnit: null,
    reorderQuantity: 4,
    deliveryDate: "10/14/19"
  }
];

describe("Dashboard", () => {
  it("should return a FlatList", () => {
    const dashboard = shallow(<Dashboard />);
    const flatList = dashboard.find("FlatList");
    expect(flatList.length).toBe(1);
  });

  it("should have Needs to be reordered and upcoming deliveries tabs", () => {
    const dashboard = shallow(<Dashboard />);
    const tabs = dashboard.find("Tabs");
    const children = tabs.props().children().props.children;
    expect(children[0].props.value).toBe("Needs to be reordered");
    expect(children[1].props.value).toBe("Upcoming deliveries");
  });
  it("should show Needs to be reordered as active", () => {
    const dashboard = shallow(<Dashboard />);
    const tabs = dashboard.find("Tabs");
    const children = tabs.props().children().props.children;
    expect(children[0].props.active).toBe(true);
    expect(children[1].props.active).toBe(false);
  });
  it("should set the active prop to true when a tab is pressed", () => {
    const dashboard = shallow(<Dashboard />);
    const tabs = dashboard.find("Tabs");
    let children = tabs.props().children().props.children;
    children[1].props.onPress();
    dashboard.update();
    children = dashboard
      .find("Tabs")
      .props()
      .children().props.children;
    expect(children[1].props.active).toBe(true);
    expect(children[0].props.active).toBe(false);
  });
  describe("when Needs to be reordered is active", () => {
    it("should return a list of Cards equal to Needs to be Reordered data length", () => {
      const dashboard = shallow(
        <Dashboard needsToBeReordered={needsToBeReordered} />
      );
      const list = dashboard.find("FlatList").dive();
      const items = list.props().data.map(list.props().renderItem);
      expect(items.length).toBe(2);
    });
    it("should return cards with data in the correct slots", () => {
      const dashboard = renderer.create(
        <Dashboard needsToBeReordered={needsToBeReordered} />
      );
      expect(dashboard.toJSON().children).toMatchSnapshot();
    });
    it("should show total reorder cost in list footer", () => {
      const dashboard = shallow(
        <Dashboard needsToBeReordered={needsToBeReordered} />
      );
      const list = dashboard.find("FlatList");
      const value = list.props().ListFooterComponent.props.children.join("");
      expect(value).toBe("Total reorder cost: $72");
    });
  });
  describe("when Upcoming deliveries is active", () => {
    it("should return a list of Cards equal to Upcoming deliveries data length", () => {
      const dashboard = shallow(
        <Dashboard upcomingDeliveries={upcomingDeliveries} />
      );
      const tabs = dashboard.find("Tabs");
      let children = tabs.props().children().props.children;
      children[1].props.onPress();
      const list = dashboard.find("FlatList").dive();
      const items = list.props().data.map(list.props().renderItem);
      expect(items.length).toBe(2);
    });
    it("should return cards with data in the correct slots", () => {
      const dashboard = shallow(
        <Dashboard upcomingDeliveries={upcomingDeliveries} />
      );
      const tabs = dashboard.find("Tabs");
      let children = tabs.props().children().props.children;
      children[1].props.onPress();
      dashboard.update;
      const list = dashboard.find("FlatList");
      const items = list.props().data.map(list.props().renderItem);
      expect(items).toMatchSnapshot();
    });
    it("should not display a list footer", () => {
      const dashboard = shallow(
        <Dashboard upcomingDeliveries={upcomingDeliveries} />
      );
      const tabs = dashboard.find("Tabs");
      let children = tabs.props().children().props.children;
      children[1].props.onPress();
      dashboard.update();
      const list = dashboard.find("FlatList");
      const footer = list.props().ListFooterComponent;
      expect(footer).toBe(null);
    });
  });
});
