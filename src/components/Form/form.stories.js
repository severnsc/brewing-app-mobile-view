import React from "react";
import Form from ".";
import { TextInput, Button } from "..";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, object } from "@storybook/addon-knobs";

const onChange = (onPress = () => {});

storiesOf("Form", module)
  .addDecorator(withKnobs)
  .add("with children", () => (
    <Form onSubmit={() => {}} style={object("Style", {}, "Form")}>
      {(values, onChange, onSubmit) => {
        const [first, second, ...rest] = values;
        return (
          <React.Fragment>
            <TextInput
              label={text("Label", "Text", "Form")}
              value={first && first.value}
              placeholder={text("Placeholder", "enter text", "Form")}
              onChange={onChange}
            />
            <TextInput
              label={text("Label 2", "Email", "Form")}
              value={second && second.value}
              placeholder={text("Placeholder 2", "enter email", "Form")}
              onChange={onChange}
            />
            <Button
              success={true}
              value={text("Button value", "submit", "Form")}
              onPress={onSubmit}
            />
          </React.Fragment>
        );
      }}
    </Form>
  ));
