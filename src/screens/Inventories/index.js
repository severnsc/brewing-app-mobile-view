import React, { useState } from "react";
import PropTypes from "prop-types";
import InventoriesLayout from "./Layout";
import HopCard from "./HopCard";
import MaltCard from "./MaltCard";
import YeastCard from "./YeastCard";
import OtherCard from "./OtherCard";

const Inventories = ({ data }) => {
  const [inventoryType, setInventoryType] = useState("Hops");
  const keyExtractor = item => item.id;
  const components = {
    Hops: item => (
      <HopCard
        name={item.name}
        purchaseDate={item.purchaseDate}
        quantity={item.quantity}
        alphaAcids={item.alphaAcids}
        unitCost={item.unitCost}
        countryOfOrigin={item.countryOfOrigin}
      />
    ),
    Malt: item => (
      <MaltCard
        name={item.name}
        color={item.color}
        purchaseDate={item.purchaseDate}
        quantity={item.quantity}
        maltType={item.maltType}
        unitCost={item.unitCost}
        countryOfOrigin={item.countryOfOrigin}
      />
    ),
    Yeast: item => (
      <YeastCard
        name={item.name}
        purchaseDate={item.purchaseDate}
        quantity={item.quantity}
        yeastType={item.yeastType}
        unitCost={item.unitCost}
        dryOrLiquid={item.dryOrLiquid}
      />
    ),
    Other: item => (
      <OtherCard
        name={item.name}
        purchaseDate={item.purchaseDate}
        quantity={item.quantity}
        unitCost={item.unitCost}
      />
    )
  };
  return (
    <InventoriesLayout
      onTabChange={setInventoryType}
      renderItem={components[inventoryType]}
      keyExtractor={keyExtractor}
      data={data}
    />
  );
};

Inventories.propTypes = {
  data: PropTypes.array
};

Inventories.defaultProps = {
  data: [{ id: "1" }]
};

export default Inventories;
