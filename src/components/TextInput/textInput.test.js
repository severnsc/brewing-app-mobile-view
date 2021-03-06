import React from "react";
import TextInput from ".";
import { shallow } from "enzyme";

describe("TextInput", () => {
  describe("when the value changes", () => {
    it("should call the onChange prop", () => {
      const onChange = jest.fn();
      const textInput = shallow(
        <TextInput onChange={onChange} autoFocus={true} />
      );
      textInput.find("TextInput").simulate("changeText");
      expect(onChange.mock.calls.length).toBe(1);
    });

    it("should pass the changed value to onChange", () => {
      const onChange = jest.fn();
      const textInput = shallow(
        <TextInput onChange={onChange} autoFocus={true} />
      );
      textInput.find("TextInput").simulate("changeText", "a");
      expect(onChange.mock.calls[0][0]).toBe("a");
    });
  });
  describe("when keyboardType is not defined", () => {
    it("should be set to default", () => {
      const onChange = jest.fn();
      const textInput = shallow(<TextInput onChange={onChange} />);
      expect(textInput.find("TextInput").prop("keyboardType")).toBe("default");
    });
  });
  describe("when blurred", () => {
    it("should set focused state to false", () => {
      const onChange = jest.fn();
      const textInput = shallow(
        <TextInput autoFocus={true} onChange={onChange} />
      );
      textInput.find("TextInput").simulate("blur");
      expect(textInput.state("focused")).toBe(false);
    });
  });
  describe("errorTestID prop", () => {
    it("sets the errorText testID equal", () => {
      const onChange = jest.fn();
      const textInput = shallow(
        <TextInput
          isError={true}
          errorText={"Error!"}
          onChange={onChange}
          errorTestID="errorID"
        />
      );
      const error = textInput.find("Text");
      expect(error.prop("testID")).toBe("errorID");
    });
  });
  describe("loading prop", () => {
    describe("when true", () => {
      it("renders an ActivityIndicator", () => {
        const onChange = jest.fn();
        const textInput = shallow(
          <TextInput onChange={onChange} loading={true} />
        );
        const activityIndicator = textInput.findWhere(
          n => n.prop("animating") === true
        );
        expect(activityIndicator).toHaveLength(1);
      });
    });
  });
});
