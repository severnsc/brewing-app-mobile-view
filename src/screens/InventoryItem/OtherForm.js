import React from "react";
import { Icon, TextInput } from "../../components";

const OtherForm = () => (
  <React.Fragment>
    <Icon name="balance-scale" />
    <TextInput placeholder="Current Quantity" />
    <Icon name="ios-cash" />
    <TextInput placeholder="Unit Cost" />
    <Icon name="ios-calendar" />
    <TextInput placeholder="Delivery Date" />
    <Icon name="ios-list" />
    <TextInput placeholder="Amount to Reorder" />
    <Icon name="ios-list" />
    <TextInput placeholder="Quantity at which to Reorder" />
  </React.Fragment>
);

export default OtherForm;
