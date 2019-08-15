import React from "react";
import PropTypes from "prop-types";
import { Icon, TextInput } from "../../components";

const OtherForm = ({
  currentQuantity,
  setCurrentQuantity,
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
      keyboard="decimal-pad"
    />
    <Icon name="ios-cash" />
    <TextInput
      placeholder="Unit Cost"
      value={unitCost}
      onChange={setUnitCost}
      keyboard="decimal-pad"
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
  </React.Fragment>
);

OtherForm.propTypes = {
  currentQuantity: PropTypes.number,
  setCurrentQuantity: PropTypes.func.isRequired,
  unitCost: PropTypes.number,
  setUnitCost: PropTypes.func.isRequired,
  deliveryDate: PropTypes.string,
  setDeliveryDate: PropTypes.func.isRequired,
  reorderQuantity: PropTypes.number,
  setReorderQuantity: PropTypes.func.isRequired,
  reorderThreshold: PropTypes.number,
  setReorderThreshold: PropTypes.func.isRequired
};

OtherForm.defaultProps = {
  setCurrentQuantity: () => {},
  setUnitCost: () => {},
  setDeliveryDate: () => {},
  setReorderQuantity: () => {},
  setReorderThreshold: () => {}
};

export default OtherForm;
