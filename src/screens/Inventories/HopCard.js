import React from "react";
import PropTypes from "prop-types";
import { Card, Subtitle, Text } from "../../components";

const HopCard = ({
  name,
  purchaseDate,
  quantity,
  alphaAcids,
  unitCost,
  countryOfOrigin
}) => (
  <Card
    upperLeft={<Subtitle value={name} />}
    upperRight={<Text value={purchaseDate} />}
    lowerLeft={<Text value={quantity} />}
    lowerCenterLeft={<Text value={alphaAcids} />}
    lowerCenterRight={<Text value={unitCost} />}
    lowerRight={<Text value={countryOfOrigin} />}
  />
);

HopCard.propTypes = {
  name: PropTypes.string,
  purchaseDate: PropTypes.string,
  quantity: PropTypes.string,
  alphaAcids: PropTypes.string,
  unitCost: PropTypes.string,
  countryOfOrigin: PropTypes.string
};

export default HopCard;
