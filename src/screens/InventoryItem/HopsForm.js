import React from "react";
import PropTypes from "prop-types";
import { Icon, TextInput } from "../../components";

const HopsForm = ({
  currentQuantity,
  setCurrentQuantity,
  alphaAcids,
  setAlphaAcids,
  country,
  setCountry,
  unitCost,
  setUnitCost,
  deliveryDate,
  setDelvieryDate,
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
      keyboardType="decimal-pad"
    />
    <Icon name="percent" />
    <TextInput
      placeholder="Alpha Acids"
      value={alphaAcids}
      onChange={setAlphaAcids}
      keyboardType="decimal-pad"
    />
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
      keyboardType="decimal-pad"
    />
    <Icon name="ios-calendar" />
    <TextInput
      placeholder="Delivery Date"
      value={deliveryDate}
      onChange={setDelvieryDate}
    />
    <Icon name="ios-list" />
    <TextInput
      placeholder="Amount to Reorder"
      value={reorderQuantity}
      onChange={setReorderQuantity}
      keyboardType="decimal-pad"
    />
    <Icon name="ios-list" />
    <TextInput
      placeholder="Quantity at which to Reorder"
      value={reorderThreshold}
      onChange={setReorderThreshold}
      keyboardType="decimal-pad"
    />
  </React.Fragment>
);

HopsForm.propTypes = {
  currentQuantity: PropTypes.number,
  setCurrentQuantity: PropTypes.func.isRequired,
  alphaAcids: PropTypes.number,
  setAlphaAcids: PropTypes.func.isRequired,
  country: PropTypes.string,
  setCountry: PropTypes.func.isRequired,
  unitCost: PropTypes.number,
  setUnitCost: PropTypes.func.isRequired,
  deliveryDate: PropTypes.string,
  setDelvieryDate: PropTypes.func.isRequired,
  reorderQuantity: PropTypes.number,
  setReorderQuantity: PropTypes.func.isRequired,
  reorderThreshold: PropTypes.number,
  setReorderThreshold: PropTypes.func.isRequired
};

HopsForm.defaultProps = {
  setAlphaAcids: () => {},
  setCountry: () => {},
  setCurrentQuantity: () => {},
  setDelvieryDate: () => {},
  setReorderQuantity: () => {},
  setReorderThreshold: () => {},
  setUnitCost: () => {}
};

export default HopsForm;
