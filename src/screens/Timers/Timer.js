import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import {
  Title,
  Clock,
  Button,
  Icon,
  Subtitle,
  Text,
  TextInput,
  TimerInput,
  Swipable
} from "../../components";

const icon = <Icon name="md-create" />;
const separator = () => (
  <View
    style={{
      borderBottomWidth: 1,
      borderBottomColor: "#000"
    }}
  />
);

const ReadMode = ({ title, duration, alerts, toggleEditing }) => (
  <View>
    <Title value={title} />
    <Clock size="sm" ms={duration} />
    <Button
      circle={true}
      primary={true}
      value={icon}
      onPress={toggleEditing}
      testID="editButton"
    />
    <Button danger={true} value="Delete timer" />
    <Subtitle value={alerts.length + " alerts"} />
    <FlatList
      data={alerts}
      renderItem={item => (
        <React.Fragment>
          <Text>{item.message}</Text>
          <Clock size="md" ms={item.activationTime} />
        </React.Fragment>
      )}
      ItemSeparatorComponent={separator}
    />
    <Button value="Activate Timer" success={true} />
  </View>
);

const EditMode = ({
  title,
  duration,
  alerts,
  toggleEditing,
  onAlertMessageChange
}) => (
  <View>
    <TextInput value={title} />
    <TimerInput value={duration} />
    <Subtitle value={alerts.length + " alerts"} />
    <FlatList
      data={alerts}
      renderItem={item => {
        const deleteButton = <Button danger={true} value="Delete" />;
        return (
          <Swipable swipeLeftComponent={deleteButton}>
            <View>
              <TextInput value={item.message} onChange={onAlertMessageChange} />
              <TimerInput value={item.activationTime} />
            </View>
          </Swipable>
        );
      }}
      ItemSeparatorComponent={separator}
    />
    <Button
      circle={true}
      success={true}
      value={<Icon name="ios-add-circle" />}
    />
  </View>
);

const Timer = ({ title, duration, alerts, onAlertMessageChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(!isEditing);
  return isEditing ? (
    <EditMode
      title={title}
      duration={duration}
      alerts={alerts}
      onAlertMessageChange={onAlertMessageChange}
    />
  ) : (
    <ReadMode
      title={title}
      duration={duration}
      alerts={alerts}
      toggleEditing={toggleEditing}
    />
  );
};

Timer.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.number,
  alerts: PropTypes.array.isRequired,
  onAlertMessageChange: PropTypes.func.isRequired
};

Timer.defaultProps = {
  title: "",
  duration: 0,
  alerts: [],
  onAlertMessageChange: () => {}
};

export default Timer;
