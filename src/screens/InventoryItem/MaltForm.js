import React from "react";
import PropTypes from "prop-types";
import { Text, TextInput, Icon, MaltColor } from "../../components";

const MaltForm = ({
  currentQuantity,
  setCurrentQuantity,
  type,
  selectMaltType,
  color,
  setColor,
  country,
  setCountry,
  unitCost,
  setUnitCost,
  deliveryDate,
  setDeliveryDate,
  reorderQuantity,
  setReorderQuantity,
  reorderThreshold,
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
    <Text value={type} onPress={selectMaltType} />
    <Icon name="ios-arrow-forward" />
    <MaltColor value={2} displayValue={false} />
    <TextInput placeholder="Malt Color" value={color} onChange={setColor} />
    <Icon name="md-globe" />
    <TextInput
      placeholder="Country of Origin"
      value={country}
      onChange={setCountry}
    />
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
      value={reorderThreshold}
      onChange={setReorderThreshold}
    />
    );
  </React.Fragment>
);

MaltForm.propTypes = {
  currentQuantity: PropTypes.number,
  setCurrentQuantity: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["Base", "Crystal", "Roast", "Malt Type"]),
  selectMaltType: PropTypes.func.isRequired,
  color: PropTypes.number,
  setColor: PropTypes.func.isRequired,
  country: PropTypes.string,
  setCountry: PropTypes.func.isRequired,
  unitCost: PropTypes.number,
  setUnitCost: PropTypes.func.isRequired,
  deliveryDate: PropTypes.string,
  setDeliveryDate: PropTypes.func.isRequired,
  reorderQuantity: PropTypes.number,
  setReorderQuantity: PropTypes.func.isRequired,
  reorderThreshold: PropTypes.number,
  setReorderThreshold: PropTypes.func.isRequired
};

MaltForm.defaultProps = {
  setColor: () => {},
  setCountry: () => {},
  setCurrentQuantity: () => {},
  setDeliveryDate: () => {},
  setReorderQuantity: () => {},
  setReorderThreshold: () => {},
  selectMaltType: () => {},
  setUnitCost: () => {}
};

export default MaltForm;
