import React from "react";
import PropTypes from "prop-types";
import { Card, Subtitle, Text } from "../../components";

const OtherCard = ({ name, purchaseDate, quantity, unitCost }) => (
  <Card
    upperLeft={<Subtitle value={name} />}
    upperRight={<Text value={purchaseDate} />}
    lowerLeft={<Text value={quantity} />}
    lowerRight={<Text value={unitCost} />}
  />
);

OtherCard.propTypes = {
  name: PropTypes.string,
  purchaseDate: PropTypes.string,
  quantity: PropTypes.string,
  unitCost: PropTypes.string
};

export default OtherCard;
