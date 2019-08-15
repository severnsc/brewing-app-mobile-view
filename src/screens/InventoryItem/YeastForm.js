import React from "react";
import PropTypes from "prop-types";
import { TextInput, Icon, Text } from "../../components";
import { Switch } from "react-native";

const YeastForm = ({
  currentQuantity,
  setCurrentQuantity,
  type,
  selectType,
  isLiquid,
  toggleIsLiquid,
  unitCost,
  setUnitCost,
  deliveryDate,
  setDeliveryDate,
  reorderQuantity,
  setReorderQuantity,
  reoderThreshold,
  setReorderThreshold
}) => (
  <React.Fragment>
    <Icon name="balance-scale" />
    <TextInput
      placeholder="Current Quantity"
      value={currentQuantity}
      onChange={setCurrentQuantity}
    />
    <Icon name="ios-list" />
    <Text value="Yeast Type" value={type} onPress={selectType} />
    <Icon name="ios-arrow-forward" />
    <Icon name="ios-flask" />
    <Text value="Dry" />
    <Switch value={isLiquid} onValueChange={toggleIsLiquid} />
    <Text value="Liquid" />
    <Icon name="md-globe" />
    <Icon name="ios-cash" />
    <TextInput
      placeholder="Unit Cost"
      value={unitCost}
      onChange={setUnitCost}
    />
    <Icon name="ios-calendar" />
    <TextInput
      placeholder="Delivery Date"
      value={deliveryDate}
      onChange={setDeliveryDate}
    />
    <Icon name="ios-list" />
    <TextInput
      placeholder="Amount to Reorder"
      value={reorderQuantity}
      onChange={setReorderQuantity}
    />
    <Icon name="ios-list" />
    <TextInput
      placeholder="Quantity at which to Reorder"
      value={reoderThreshold}
      onChange={setReorderThreshold}
    />
  </React.Fragment>
);

YeastForm.propTypes = {
  currentQuantity: PropTypes.number,
  setCurrentQuantity: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["Yeast Type", "Ale", "Lager", "Hybrid"]),
  selectType: PropTypes.func.isRequired,
  isLiquid: PropTypes.bool,
  toggleIsLiquid: PropTypes.func.isRequired,
  unitCost: PropTypes.number,
  setUnitCost: PropTypes.func.isRequired,
  deliveryDate: PropTypes.string,
  setDeliveryDate: PropTypes.func.isRequired,
  reorderQuantity: PropTypes.number,
  setReorderQuantity: PropTypes.func.isRequired,
  reoderThreshold: PropTypes.number,
  setReorderThreshold: PropTypes.func.isRequired
};

YeastForm.defaultProps = {
  type: "Yeast Type",
  setCurrentQuantity: () => {},
  selectType: () => {},
  toggleIsLiquid: () => {},
  setUnitCost: () => {},
  setDeliveryDate: () => {},
  setReorderQuantity: () => {},
  setReorderThreshold: () => {}
};

export default YeastForm;
