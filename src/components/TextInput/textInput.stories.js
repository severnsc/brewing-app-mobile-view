import React from "react";
import TextInput from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

const groupId = "TextInput";

storiesOf("TextInput", module).add("with value", () => (
  <TextInput
    label={text("Label", "Username", groupId)}
    value={text("Value", "text goes here", groupId)}
    placeholder={text("Placeholder", "", groupId)}
    password={boolean("Password", false, groupId)}
    autoFocus={boolean("Auto focus", false, groupId)}
    isError={boolean("Error", false, groupId)}
    onChange={() => {}}
    loading={boolean("Loading", false, groupId)}
  />
));
