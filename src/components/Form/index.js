import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

class Form extends React.Component {
  state = {
    childValues: this.props.initialValues || []
  };

  onChange = (id, value) => {
    const { childValues } = this.state;
    if (childValues.some(c => c.id === id)) {
      const updatedChildValues = childValues.map(c =>
        c.id === id ? { ...c, value } : c
      );
      this.setState({ childValues: updatedChildValues });
    } else {
      this.setState({ childValues: [...childValues, { id, value }] });
    }
  };

  onSubmit = () => this.props.onSubmit(...this.state.childValues);

  render() {
    const { childValues } = this.state;
    const { style, testID, children } = this.props;
    return (
      <View testID={testID} style={style}>
        {children(childValues, this.onChange, this.onSubmit)}
      </View>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ])
    })
  ),
  children: PropTypes.func.isRequired,
  testID: PropTypes.string
};

export default Form;
