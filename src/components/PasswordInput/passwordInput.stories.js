import React from "react";
import PasswordInput from ".";
import { ScrollView } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";
const GROUP_ID = "PasswordInput";
storiesOf("PasswordInput", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <ScrollView>{story()}</ScrollView>)
  .add("default", () => (
    <PasswordInput
      onChange={() => {}}
      error={text("Error", "", GROUP_ID)}
      value={text("Value", "", GROUP_ID)}
    />
  ));
