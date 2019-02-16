import React from "react";
import UsernameInput from ".";
import { shallow } from "enzyme";

jest.mock("../../modules/validation");
describe("UsernameInput", () => {
  beforeEach(() => {
    require("../../modules/validation");
  });
  describe("error prop", () => {
    it("should set isError on TextInput to true", () => {
      const error = "error";
      const onChange = jest.fn();
      const usernameInput = shallow(
        <UsernameInput onChange={onChange} error={error} />
      );
      expect(usernameInput.prop("isError")).toBe(true);
    });
    it("should set errorText on TextInput to its value", () => {
      const error = "error";
      const onChange = jest.fn();
      const usernameInput = shallow(
        <UsernameInput onChange={onChange} error={error} />
      );
      expect(usernameInput.prop("errorText")).toEqual(error);
    });
  });
  describe("mounting", () => {
    describe("with value that is already taken", () => {
      it("should set state to USERNAME ALREADY TAKEN", async () => {
        const onChange = jest.fn();
        const usernameInput = shallow(
          <UsernameInput onChange={onChange} value="taken" />
        );
        await usernameInput.instance().componentDidMount();
        expect(usernameInput.state("error")).toBe("USERNAME ALREADY TAKEN!");
      });
      it("should set TextInput isError to true", async () => {
        const onChange = jest.fn();
        const usernameInput = shallow(
          <UsernameInput onChange={onChange} value="taken" />
        );
        await usernameInput.instance().componentDidMount();
        expect(usernameInput.find("TextInput").prop("isError")).toBe(true);
      });
      it("should set TextInput errorText to USERNAME ALREADY TAKEN", async () => {
        const onChange = jest.fn();
        const usernameInput = shallow(
          <UsernameInput onChange={onChange} value="taken" />
        );
        await usernameInput.instance().componentDidMount();
        expect(usernameInput.find("TextInput").prop("errorText")).toBe(
          "USERNAME ALREADY TAKEN!"
        );
      });
    });
    describe("with a value that is not already taken", () => {
      it("should not change state", async () => {
        const onChange = jest.fn();
        const usernameInput = shallow(
          <UsernameInput onChange={onChange} value="not taken" />
        );
        expect(usernameInput.state("error")).toBe("");
        await usernameInput.instance().componentDidMount();
        expect(usernameInput.state("error")).toBe("");
      });
      it("should set TextInput isError to false", async () => {
        const onChange = jest.fn();
        const usernameInput = shallow(
          <UsernameInput onChange={onChange} value="not taken" />
        );
        await usernameInput.instance().componentDidMount();
        expect(usernameInput.find("TextInput").prop("isError")).toBe(false);
      });
      it("should set TextInput errorText to empty string", async () => {
        const onChange = jest.fn();
        const usernameInput = shallow(
          <UsernameInput onChange={onChange} value="not taken" />
        );
        await usernameInput.instance().componentDidMount();
        expect(usernameInput.find("TextInput").prop("errorText")).toBe("");
      });
    });
  });
  describe("updating", () => {
    it("should call the onChange prop", () => {
      const onChange = jest.fn();
      const usernameInput = shallow(
        <UsernameInput onChange={onChange} value="" />
      );
      usernameInput.find("TextInput").simulate("change");
      expect(onChange).toHaveBeenCalled();
    });
    it("should pass the changed value to onChange", () => {
      const onChange = jest.fn();
      const usernameInput = shallow(
        <UsernameInput onChange={onChange} value="" />
      );
      usernameInput.find("TextInput").simulate("change", "value");
      expect(onChange).toHaveBeenCalledWith("value");
    });
    describe("with a value that is already taken", () => {
      describe("when previous value was not already taken", () => {
        it("should set state to USERNAME ALREADY TAKEN", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.state("error")).toBe("");
          usernameInput.setProps({ value: "taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "" });
          expect(usernameInput.state("error")).toBe("USERNAME ALREADY TAKEN!");
        });
        it("should set TextInput isError to true", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("isError")).toBe(false);
          usernameInput.setProps({ value: "taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "" });
          expect(usernameInput.find("TextInput").prop("isError")).toBe(true);
        });
        it("should set TextInput errorText to USERNAME ALREADY TAKEN", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("errorText")).toBe("");
          usernameInput.setProps({ value: "taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "" });
          expect(usernameInput.find("TextInput").prop("errorText")).toBe(
            "USERNAME ALREADY TAKEN!"
          );
        });
      });
      describe("when previous value was already taken", () => {
        it("should not change the state", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="taken" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.state("error")).toBe("USERNAME ALREADY TAKEN!");
          usernameInput.setProps({ value: "taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "taken" });
          expect(usernameInput.state("error")).toBe("USERNAME ALREADY TAKEN!");
        });
        it("should set TextInput isError to true", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="taken" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("isError")).toBe(true);
          usernameInput.setProps({ value: "taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "taken" });
          expect(usernameInput.find("TextInput").prop("isError")).toBe(true);
        });
        it("should set TextInput errorText to USERNAME ALREADY TAKEN", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="taken" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("errorText")).toBe(
            "USERNAME ALREADY TAKEN!"
          );
          usernameInput.setProps({ value: "taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "taken" });
          expect(usernameInput.find("TextInput").prop("errorText")).toBe(
            "USERNAME ALREADY TAKEN!"
          );
        });
      });
    });
    describe("with a value that is not taken", () => {
      describe("when previous value was also not taken", () => {
        it("should not change state", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="not take" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.state("error")).toBe("");
          usernameInput.setProps({ value: "not taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "not take" });
          expect(usernameInput.state("error")).toBe("");
        });
        it("should set TextInput isError to false", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="not take" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("isError")).toBe(false);
          usernameInput.setProps({ value: "not taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "not take" });
          expect(usernameInput.find("TextInput").prop("isError")).toBe(false);
        });
        it("should set TextInput errorText to empty string", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="not take" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("errorText")).toBe("");
          usernameInput.setProps({ value: "not taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "not take" });
          expect(usernameInput.find("TextInput").prop("errorText")).toBe("");
        });
      });
      describe("when previous value was taken", () => {
        it("should update the state to empty string", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="taken" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.state("error")).toBe("USERNAME ALREADY TAKEN!");
          usernameInput.setProps({ value: "not taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "taken" });
          expect(usernameInput.state("error")).toBe("");
        });
        it("should set TextInput isError to false", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="taken" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("isError")).toBe(true);
          usernameInput.setProps({ value: "not taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "not take" });
          expect(usernameInput.find("TextInput").prop("isError")).toBe(false);
        });
        it("should set TextInput errorText to empty string", async () => {
          const onChange = jest.fn();
          const usernameInput = shallow(
            <UsernameInput onChange={onChange} value="taken" />
          );
          await usernameInput.instance().componentDidMount();
          expect(usernameInput.find("TextInput").prop("errorText")).toBe(
            "USERNAME ALREADY TAKEN!"
          );
          usernameInput.setProps({ value: "not taken" });
          await usernameInput
            .instance()
            .componentDidUpdate({ onChange, value: "not take" });
          expect(usernameInput.find("TextInput").prop("errorText")).toBe("");
        });
      });
    });
  });
});
