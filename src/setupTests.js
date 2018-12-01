import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React = require('React');

  class TextInput extends React.Component {
    render() {
      return React.createElement('TextInput', {...this.props, autoFocus: false}, this.props.children);
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});