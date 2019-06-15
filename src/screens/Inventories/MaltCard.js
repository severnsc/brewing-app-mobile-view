import React from "react";
import PropTypes from "prop-types";
import { Card, Subtitle, Text, MaltColor } from "../../components";

const MaltCard = ({
  name,
  color,
  purchaseDate,
  quantity,
  maltType,
  unitCost,
  countryOfOrigin
}) => (
  <Card
    upperLeft={<Subtitle value={name} />}
    upperCenter={<MaltColor value={color} />}
    upperRight={<Text value={purchaseDate} />}
    lowerLeft={<Text value={quantity} />}
    lowerCenterLeft={<Text value={maltType} />}
    lowerCenterRight={<Text value={unitCost} />}
    lowerRight={<Text value={countryOfOrigin} />}
  />
);

MaltCard.propTypes = {
  name: PropTypes.string,
  color: PropTypes.number,
  purchaseDate: PropTypes.string,
  quantity: PropTypes.string,
  maltType: PropTypes.string,
  unitCost: PropTypes.string,
  countryOfOrigin: PropTypes.string
};

export default MaltCard;
