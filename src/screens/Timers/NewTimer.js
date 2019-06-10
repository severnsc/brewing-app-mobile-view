import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { TimerInput, TextInput, Subtitle, Button } from "../../components";

const NewTimer = ({
  onTimerNameChange,
  onTimerDurationChange,
  onAlertMessageChange,
  onAlertTimeChange,
  onPress
}) => (
  <View>
    <TextInput autoFocus={true} onChange={onTimerNameChange} />
    <TimerInput
      placeholder="Timer Duration (HH:MM:SS)"
      onChange={onTimerDurationChange}
    />
    <Subtitle value="Alerts" />
    <TextInput placeholder="Alert Message" onChange={onAlertMessageChange} />
    <TimerInput
      placeholder="Alert Time (HH:MM:SS)"
      onChange={onAlertTimeChange}
    />
    <Button circle={true} success={true} value="+" onPress={onPress} />
  </View>
);

NewTimer.propTypes = {
  onTimerNameChange: PropTypes.func.isRequired,
  onTimerDurationChange: PropTypes.func.isRequired,
  onAlertMessageChange: PropTypes.func.isRequired,
  onAlertTimeChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired
};

NewTimer.defaultProps = {
  onTimerNameChange: () => {},
  onTimerDurationChange: () => {},
  onAlertMessageChange: () => {},
  onAlertTimeChange: () => {},
  onPress: () => {}
};

export default NewTimer;
