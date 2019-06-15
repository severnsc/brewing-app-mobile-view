import React from "react";
import Inventories from ".";
import InventoriesLayout from "./Layout";
import { shallow } from "enzyme";

describe("Inventories layout", () => {
  it("returns tabs for each inventory category", () => {
    const inventories = shallow(<InventoriesLayout />);
    const tabs = inventories
      .find("Tabs")
      .props()
      .children("Hops", () => {});
    expect(tabs.props.children).toHaveLength(4);
    expect(tabs.props.children[0].props.value).toBe("Hops");
    expect(tabs.props.children[1].props.value).toBe("Malt");
    expect(tabs.props.children[2].props.value).toBe("Yeast");
    expect(tabs.props.children[3].props.value).toBe("Other");
  });
  it("passes onTabChange to Tabs", () => {
    const onTabChange = jest.fn();
    const inventories = shallow(
      <InventoriesLayout onTabChange={onTabChange} />
    );
    const tabs = inventories.find("Tabs");
    expect(tabs.prop("onChange")).toBe(onTabChange);
  });
  it("initially sets the Hops tab to active true", () => {
    const inventories = shallow(<InventoriesLayout />);
    const tabs = inventories.find("Tabs");
    const handlePress = jest.fn();
    const wrapper = tabs.props().children("Hops", handlePress);
    expect(wrapper.props.children[0].props.active).toBe(true);
    expect(wrapper.props.children[1].props.active).toBe(false);
    expect(wrapper.props.children[2].props.active).toBe(false);
    expect(wrapper.props.children[3].props.active).toBe(false);
  });
  it("sets the onPress of all tabs to handlePress", () => {
    const inventories = shallow(<InventoriesLayout />);
    const tabs = inventories.find("Tabs");
    const handlePress = jest.fn();
    const wrapper = tabs.props().children("Hops", handlePress);
    expect(wrapper.props.children[0].props.onPress).toBe(handlePress);
    expect(wrapper.props.children[1].props.onPress).toBe(handlePress);
    expect(wrapper.props.children[2].props.onPress).toBe(handlePress);
    expect(wrapper.props.children[3].props.onPress).toBe(handlePress);
  });
  it("returns a FlatList with renderItem from the data", () => {
    const data = [
      {
        id: "1",
        name: "Chinook",
        createdAt: "11/15/2018",
        quantity: 8.5,
        alphaAcids: 12.4,
        unitCost: 12,
        country: "USA"
      },
      {
        id: "2",
        name: "Bravo",
        createdAt: "12/2/2018",
        quantity: 10,
        alphaAcids: 10.6,
        unitCost: 9,
        country: "USA"
      }
    ];
    const renderItem = item => item;
    const inventories = shallow(
      <InventoriesLayout data={data} renderItem={renderItem} />
    );
    const list = inventories.find("FlatList");
    expect(list).toHaveLength(1);
    const cards = data.map(list.props().renderItem);
    expect(cards).toMatchSnapshot();
  });
});

describe("Inventories screen", () => {
  it("returns Hop cards when hops tab is active", () => {
    const data = [
      {
        id: "1",
        name: "Chinook",
        purchaseDate: "11/15/2018",
        quantity: "8.5 lbs",
        alphaAcids: "12.4% AA",
        unitCost: "$12/lb",
        countryOfOrigin: "USA"
      },
      {
        id: "2",
        name: "Bravo",
        purchaseDate: "12/2/2018",
        quantity: "10 lbs",
        alphaAcids: "10.6% AA",
        unitCost: "$9/lb",
        countryOfOrigin: "USA"
      }
    ];
    const inventories = shallow(<Inventories data={data} />);
    const layout = inventories.dive();
    const list = layout.find("FlatList");
    const cards = data.map(list.props().renderItem);
    expect(cards).toMatchSnapshot();
  });
  it("returns Malt cards when malt is active", () => {
    const data = [
      {
        id: "1",
        name: "Maris Otter",
        purchaseDate: "11/15/2018",
        quantity: "8.5 lbs",
        maltType: "Base",
        unitCost: "$3/lb",
        countryOfOrigin: "UK"
      },
      {
        id: "2",
        name: "Crystal 10",
        purchaseDate: "1/16/2019",
        quantity: "2.5 lbs",
        maltType: "Crystal",
        unitCost: "$3.50/lb",
        countryOfOrigin: "UK"
      }
    ];
    const inventories = shallow(<Inventories data={data} />);
    inventories.props().onTabChange("Malt");
    inventories.update();
    const layout = inventories.dive();
    const list = layout.find("FlatList");
    const cards = data.map(list.props().renderItem);
    expect(cards).toMatchSnapshot();
  });
  it("returns Yeast cards when yeast is active", () => {
    const data = [
      {
        id: "1",
        name: "WLP 001 - California Ale",
        purchaseDate: "11/15/2018",
        quantity: "1 vial",
        yeastType: "Ale",
        unitCost: "$8/vial",
        dryOrLiquid: "Liquid"
      },
      {
        id: "2",
        name: "WLP 002 - English Ale",
        purchaseDate: "1/15/2019",
        quantity: "2 vials",
        yeastType: "Ale",
        unitCost: "$10/vial",
        dryOrLiquid: "Liquid"
      }
    ];
    const inventories = shallow(<Inventories data={data} />);
    inventories.props().onTabChange("Yeast");
    inventories.update();
    const layout = inventories.dive();
    const list = layout.find("FlatList");
    const cards = data.map(list.props().renderItem);
    expect(cards).toMatchSnapshot();
  });
  it("returns Other cards when other is active", () => {
    const data = [
      {
        id: "1",
        name: "Bourbon",
        purchaseDate: "11/15/2018",
        quantity: "1 bottle",
        unitCost: "$25/bottle"
      },
      {
        id: "2",
        name: "Cocoa nibs",
        purchaseDate: "1/15/2019",
        quantity: "2 lbs",
        unitCost: "$10/lb"
      }
    ];
    const inventories = shallow(<Inventories data={data} />);
    inventories.props().onTabChange("Other");
    inventories.update();
    const layout = inventories.dive();
    const list = layout.find("FlatList");
    const cards = data.map(list.props().renderItem);
    expect(cards).toMatchSnapshot();
  });
});
