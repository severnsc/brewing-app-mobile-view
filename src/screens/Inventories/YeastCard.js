import React from "react";
import PropTypes from "prop-types";
import { Card, Subtitle, Text } from "../../components";

const YeastCard = ({
  name,
  purchaseDate,
  quantity,
  yeastType,
  unitCost,
  dryOrLiquid
}) => (
  <Card
    upperLeft={<Subtitle value={name} />}
    upperRight={<Text value={purchaseDate} />}
    lowerLeft={<Text value={quantity} />}
    lowerCenterLeft={<Text value={yeastType} />}
    lowerCenterRight={<Text value={unitCost} />}
    lowerRight={<Text value={dryOrLiquid} />}
  />
);

YeastCard.propTypes = {
  name: PropTypes.string,
  purchaseDate: PropTypes.string,
  quantity: PropTypes.string,
  yeastType: PropTypes.string,
  unitCost: PropTypes.string,
  dryOrLiquid: PropTypes.oneOf(["Dry", "Liquid"])
};

export default YeastCard;
