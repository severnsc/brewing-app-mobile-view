import React, { useState } from "react";
import PropTypes from "prop-types";
import HopsForm from "./HopsForm";
import MaltForm from "./MaltForm";
import YeastForm from "./YeastForm";
import OtherForm from "./OtherForm";
import { TextInput, Icon, Text } from "../../components";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  }
});

const ItemName = () => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      value={value}
      onChange={setValue}
      style={styles.title}
      placeholder="Item Name"
      testID="itemName"
    />
  );
};

const PurchaseDate = () => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      value={value}
      onChange={setValue}
      placeholder="Purchase Date"
      testID="purchaseDate"
    />
  );
};

const renderForm = selected => {
  switch (selected) {
    case "Malt":
      return <MaltForm />;
    case "Yeast":
      return <YeastForm />;
    case "Other":
      return <OtherForm />;
    default:
      return <HopsForm />;
  }
};

const InventoryItem = ({ navigation: { navigate }, setSelected, selected }) => {
  const onPress = () => navigate("INVENTORY_SELECT", { setSelected });
  return (
    <View>
      <ItemName />
      <PurchaseDate />
      <Text value={selected} onPress={onPress} />
      <Icon name="ios-arrow-forward" />
      {renderForm(selected)}
    </View>
  );
};

InventoryItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
};

InventoryItem.defaultProps = {
  navigation: {
    navigate: () => {}
  },
  setSelected: () => {},
  selected: "Hops"
};

export default InventoryItem;
