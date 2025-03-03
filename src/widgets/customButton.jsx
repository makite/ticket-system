import { Component } from "react";
import PropTypes from "prop-types";

export default class CustomButton extends Component {
  render() {
    const { text, onClick, color = "blue" } = this.props;
    return (
      <button
        onClick={onClick}
        className={`px-9 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-${color}-500 rounded-lg text-white`}
      >
        {text}
      </button>
    );
  }
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};
