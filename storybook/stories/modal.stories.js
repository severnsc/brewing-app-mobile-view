import React from "react";
import { Modal, View } from "react-native";
import { Button, Text } from "../../src/components";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

class DisplayModal extends React.Component {
  state = {
    visible: false
  };

  toggleModal = visible => {
    this.setState({ visible });
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.state.visible}
          animationType={this.props.animationType}
          transparent={this.props.transparent}
        >
          <View style={{ marginTop: 22 }}>
            <Text value="I'm a modal" />
            <Button
              onPress={() => this.toggleModal(!this.state.visible)}
              value="Close Modal"
            />
          </View>
        </Modal>
        <Button
          onPress={() => this.toggleModal(!this.state.visible)}
          value="Show Modal"
        />
      </View>
    );
  }
}

const label = "Animation Type";
const options = ["slide", "fade", "none"];
const defaultValue = "slide";
const groupId = "Modal";

storiesOf("Modal", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <DisplayModal
      transparent={boolean("Transparent", true, groupId)}
      animationType={select(label, options, defaultValue, groupId)}
    />
  ));
