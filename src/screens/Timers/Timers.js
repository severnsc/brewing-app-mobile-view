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
          upperLeft={<Subtitle value={item.name} />}
          lowerLeft={<Clock ms={item.duration} size="sm" />}
          lowerRight={<Text value={item.alerts.length + " alerts"} />}
        />
      )}
    />
  </View>
);

export default Timers;
