import React from "react";
import InventoryItem from ".";
import HopsForm from "./HopsForm";
import MaltForm from "./MaltForm";
import YeastForm from "./YeastForm";
import OtherForm from "./OtherForm";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("HopsForm", () => {
  it("matches snapshot when no values are set", () => {
    const hopsForm = renderer.create(<HopsForm />);
    expect(hopsForm).toMatchSnapshot();
  });
});

describe("MaltForm", () => {
  it("matches snapshot when no values are set", () => {
    const maltForm = renderer.create(<MaltForm />);
    expect(maltForm).toMatchSnapshot();
  });
  it("matches snapshot when values are set", () => {
    const maltForm = renderer.create(
      <MaltForm
        currentQuantity={20}
        color={5}
        country="UK"
        unitCost={3}
        deliveryDate="01/01/2019"
        reorderQuantity={30}
        reorderThreshold={10}
      />
    );
    expect(maltForm).toMatchSnapshot();
  });
});

describe("YeastForm", () => {
  it("matches snapshot when no values are set", () => {
    const yeastForm = renderer.create(<YeastForm />);
    expect(yeastForm).toMatchSnapshot();
  });
  it("matches snapshot when values are set", () => {
    const yeastForm = renderer.create(
      <YeastForm
        type="Ale"
        currentQuantity={2}
        setCurrentQuantity={jest.fn()}
        selectType={jest.fn()}
        isLiquid={true}
        toggleIsLiquid={jest.fn()}
        unitCost={10}
        setUnitCost={jest.fn()}
        deliveryDate={"01/02/2019"}
        setDeliveryDate={jest.fn()}
        reorderQuantity={1}
        setReorderQuantity={jest.fn()}
        reoderThreshold={1}
        setReorderThreshold={jest.fn()}
      />
    );
    expect(yeastForm).toMatchSnapshot();
  });
});

describe("otherForm", () => {
  it("matches snapshot", () => {
    const otherForm = renderer.create(<OtherForm />);
    expect(otherForm).toMatchSnapshot();
  });
});

describe("InventoryItem screen", () => {
  it("calls navigate prop with correct args when Inventory Type is pressed", () => {
    const setSelected = jest.fn();
    const navigation = {
      navigate: jest.fn()
    };
    const inventoryItem = shallow(
      <InventoryItem navigation={navigation} setSelected={setSelected} />
    );
    const inventoryType = inventoryItem.find("Text");
    inventoryType.props().onPress();
    expect(navigation.navigate).toHaveBeenCalledWith("INVENTORY_SELECT", {
      setSelected
    });
  });
  it("updates the value of Item Name text input onChange", () => {
    const inventoryItem = shallow(<InventoryItem />);
    const itemName = inventoryItem.find("ItemName");
    const textInput = itemName.dive();
    const newValue = "new value";
    textInput.props().onChange(newValue);
    expect(textInput.prop("value")).toBe(newValue);
  });
  it("updates the value of Purchase Date input onChange", () => {
    const inventoryItem = shallow(<InventoryItem />);
    const purchaseDate = inventoryItem.find("PurchaseDate");
    const input = purchaseDate.dive();
    const newValue = "01/01/2019";
    input.props().onChange(newValue);
    expect(input.prop("value")).toBe(newValue);
  });
  it("returns a hops form by default", () => {
    const inventoryItem = shallow(<InventoryItem />);
    const hopsForm = inventoryItem.find("HopsForm");
    expect(hopsForm).toHaveLength(1);
  });
  it("returns a MaltForm when Malt is selected", () => {
    const inventoryItem = shallow(<InventoryItem selected="Malt" />);
    const maltForm = inventoryItem.find("MaltForm");
    expect(maltForm).toHaveLength(1);
    expect(maltForm).toMatchSnapshot();
  });
  it("returns a YeastForm when Yeast is selected", () => {
    const inventoryItem = shallow(<InventoryItem selected="Yeast" />);
    const yeastForm = inventoryItem.find("YeastForm");
    expect(yeastForm).toHaveLength(1);
    expect(yeastForm).toMatchSnapshot();
  });
  it("returns a OtherForm when Other is selected", () => {
    const inventoryItem = shallow(<InventoryItem selected="Other" />);
    const otherForm = inventoryItem.find("OtherForm");
    expect(otherForm).toHaveLength(1);
    expect(otherForm).toMatchSnapshot();
  });
});
