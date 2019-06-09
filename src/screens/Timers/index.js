import React from "react";
import { View, FlatList } from "react-native";
import { Title, Card, Subtitle, Clock, Text } from "../../components";

const Timers = ({ timers }) => (
  <View>
    <Title value="Timers" />
    <FlatList
      data={timers}
      renderItem={item => (
        <Card
          upperLeft={<Subtitle>{item.name}</Subtitle>}
          lowerLeft={<Clock ms={item.duration} size="sm" />}
          lowerRight={<Text>{item.alerts.length + " alerts"}</Text>}
        />
      )}
    />
  </View>
);

export default Timers;
