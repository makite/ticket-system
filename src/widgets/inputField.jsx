import { Component } from "react";
import PropTypes from "prop-types";

export default class InputField extends Component {
  render() {
    const {
      label,
      id,
      type = "text", // Default type is 'text'
      placeholder,
      required,
      onChange,
      color,
    } = this.props;

    // Render a textarea if type is 'textarea', else render input
    return (
      <div className="flex flex-col">
        <label className={`font-semibold text-lg text-${color}-500`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* Check for 'textarea' type and render accordingly */}
        {type === "textarea" ? (
          <textarea
            id={id}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            className={`mt-2 px-4 py-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-${color}-500 outline-none transition-all duration-300`}
          />
        ) : (
          <input
            type={type} // Use the passed type (email, number, etc.), default is 'text'
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`mt-2 px-4 py-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-${color}-500 outline-none transition-all duration-300`}
          />
        )}
      </div>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string, // Optional, default is 'text'
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  color: PropTypes.string,
  onChange: PropTypes.func,
};
