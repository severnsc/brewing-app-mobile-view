import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
jest.mock("react-native-gesture-handler", () => ({
  BaseButton: {}
}));
jest.mock("@expo/vector-icons", () => ({
  IonIcons: {},
  FontAwesome: {}
}));
jest.mock("expo", () => ({
  LinearGradient: ({ children }) => children,
  Constants: {
    manifest: {
      releaseChannel: ""
    }
  }
}));
jest.mock("uuid/v4", () => {
  return () => {};
});
jest.mock("TextInput", () => {
  const RealComponent = require.requireActual("TextInput");
  const React = require("React");

  class TextInput extends React.Component {
    render() {
      return React.createElement(
        "TextInput",
        { ...this.props, autoFocus: false },
        this.props.children
      );
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});
global.fetch = require("jest-fetch-mock");
