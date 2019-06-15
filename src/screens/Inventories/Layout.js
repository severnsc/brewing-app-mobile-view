import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "../../components";
import { FlatList, View } from "react-native";

export const InventoriesLayout = ({
  onTabChange,
  data,
  renderItem,
  keyExtractor
}) => (
  <View>
    <Tabs onChange={onTabChange}>
      {(active, handlePress) => {
        const types = ["Hops", "Malt", "Yeast", "Other"];
        return (
          <React.Fragment>
            {types.map(type => (
              <Tab
                key={type}
                value={type}
                active={active === type}
                onPress={handlePress}
              />
            ))}
          </React.Fragment>
        );
      }}
    </Tabs>
    <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
  </View>
);

InventoriesLayout.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  data: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired
};

InventoriesLayout.defaultProps = {
  onTabChange: () => {},
  renderItem: () => null,
  keyExtractor: item => item.id
};

export default InventoriesLayout;
