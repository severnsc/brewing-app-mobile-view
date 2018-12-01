import React from "react";
import Button from ".";
import { shallow } from "enzyme";

describe("Button", () => {
  it("should call the onPress prop onPress", () => {
    const onPress = jest.fn();
    const button = shallow(<Button value="press" onPress={onPress} />);
    button.simulate("press");
    expect(onPress.mock.calls.length).toBe(1);
  });

  describe("when disabled is true", () => {
    it("should set the disabled prop on the TouchableOpacity to true", () => {
      const onPress = jest.fn();
      const button = shallow(
        <Button value="press" onPress={onPress} disabled={true} />
      );
      expect(button.find("TouchableOpacity").prop("disabled")).toBe(true);
    });
  });

  it("should pass the style object to the TouchableOpacity", () => {
    const onPress = jest.fn();
    const button = shallow(
      <Button onPress={onPress} value="press" style={{ color: "red" }} />
    );
    expect(button.find("TouchableOpacity").prop("style").color).toBe("red");
  });
});
