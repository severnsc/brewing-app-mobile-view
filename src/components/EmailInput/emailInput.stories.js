import React from "react";
import EmailInput from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("EmailInput", module)
  .addDecorator(withKnobs)
  .add("with value", () => (
    <EmailInput
      error={text("Error", "", "EmailInput")}
      label={text("Label", "", "EmailInput")}
      value={text("Value", "value", "EmailInput")}
      placeholder={text("Placeholder", "placeholder", "EmailInput")}
      autoFocus={boolean("Auto focus", false, "EmailInput")}
      onChange={() => {}}
    />
  ));
