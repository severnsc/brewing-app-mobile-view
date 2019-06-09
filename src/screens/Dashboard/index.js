import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Text, Tabs, Tab, Subtitle } from "../../components";
import { currency } from "../../helpers";

const Dashboard = ({ needsToBeReordered, upcomingDeliveries }) => {
  const total = needsToBeReordered.reduce(
    (acc, cv) => acc + cv.unitCost * cv.reorderQuantity,
    0
  );
  const [active, setActive] = useState(true);
  const renderItem = active => {
    if (active) {
      return item => (
        <Card
          upperLeft={<Subtitle value={item.object.name} />}
          upperRight={<Text value={currency(item.costUnit) + item.unitCost} />}
          lowerLeft={
            <Text
              value={
                "Remaining: " +
                item.currentQuantity +
                (item.quantityUnit ? item.quantityUnit : "")
              }
            />
          }
          lowerRight={
            <Text
              value={
                "Reorder amount: " +
                item.reorderQuantity +
                (item.quantityUnit ? item.quantityUnit : "")
              }
            />
          }
        />
      );
    } else {
      return item => (
        <Card
          upperLeft={item.object.name}
          upperRight={item.deliveryDate}
          lowerLeft={
            "Amount ordered: " +
            item.reorderQuantity +
            (item.quantityUnit ? item.quantityUnit : "")
          }
          lowerRight={
            "Remaining: " +
            item.currentQuantity +
            (item.quantityUnit ? item.quantityUnit : "")
          }
        />
      );
    }
  };
  const listFooter = active ? (
    <Text>
      Total reorder cost: {currency(needsToBeReordered[0].costUnit) + total}
    </Text>
  ) : null;
  return (
    <View>
      <Tabs>
        {() => {
          return (
            <React.Fragment>
              <Tab
                value="Needs to be reordered"
                active={active}
                onPress={() => setActive(!active)}
              />
              <Tab
                value="Upcoming deliveries"
                active={!active}
                onPress={() => setActive(!active)}
              />
            </React.Fragment>
          );
        }}
      </Tabs>
      <FlatList
        data={active ? needsToBeReordered : upcomingDeliveries}
        renderItem={renderItem(active)}
        keyExtractor={item => item.id}
        ListFooterComponent={listFooter}
      />
    </View>
  );
};

Dashboard.defaultProps = {
  needsToBeReordered: [{ costUnit: "" }],
  upcomingDeliveries: []
};

export default Dashboard;
