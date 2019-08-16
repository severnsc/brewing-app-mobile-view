import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon, TextInput } from "../../components";

const HopsForm = () => {
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [alphaAcids, setAlphaAcids] = useState(0);
  const [country, setCountry] = useState("");
  const [unitCost, setUnitCost] = useState(0);
  const [deliveryDate, setDelvieryDate] = useState("");
  const [reorderQuantity, setReorderQuantity] = useState(0);
  const [reorderThreshold, setReorderThreshold] = useState(0);
  return (
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
};

export default HopsForm;
