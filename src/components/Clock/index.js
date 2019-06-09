import React from "react";
import PropTypes from "prop-types";
import { Text } from "..";
import styles from "./styles";
import { msToTimeString } from "../../helpers";

const Clock = ({ ms, size }) => {
  const time = msToTimeString(ms);
  return <Text style={styles[size]} value={time} />;
};

Clock.propTypes = {
  ms: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

Clock.defaultProps = {
  size: "md"
};

export default Clock;
