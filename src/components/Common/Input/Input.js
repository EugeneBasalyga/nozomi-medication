import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Input.scss';

const Input = ({
  name,
  inputLabelContainerClassName,
  inputContainerClassName,
  inputClassName,
  label,
  type,
  value,
  errorMessage,
  required,
  disabled,
  onChangeHandler,
  children,
}) => {
  const getInputClassName = (field) => {
    switch (type) {
      case 'description':
        if (field === errorMessage.field) {
          return clsx(styles.textAreaError, inputClassName);
        }
        return clsx(styles.textArea, inputClassName);
      default:
        if (field === errorMessage.field) {
          return clsx(styles.inputError, inputClassName);
        }
        return clsx(styles.input, inputClassName);
    }
  };

  const renderErrorMessage = (field) => {
    return field === errorMessage.field
      && (<div className={styles.errorMessage}>{errorMessage.error}</div>);
  };

  const renderInput = () => {
    switch (type) {
      case 'description':
        return (
          <textarea
            className={getInputClassName(name)}
            value={value}
            required={required}
            disabled={disabled}
            onChange={(e) => onChangeHandler(e, name)}
            rows="4"
            cols="40"
          />
        );
      default:
        return (
          <input
            className={getInputClassName(name)}
            type={type}
            value={value}
            required={required}
            disabled={disabled}
            onChange={(e) => onChangeHandler(e, name)}
          />
        );
    }
  };

  return (
    <>
      <div className={clsx(styles.inputLabelContainer, inputLabelContainerClassName)}>
        <label htmlFor="input">{label}</label>
        <div className={styles.inputWrapperContainer}>
          <div className={inputContainerClassName}>
            {renderInput()}
            {children}
          </div>
          {renderErrorMessage(name)}
        </div>
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputLabelContainerClassName: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.shape({
    field: PropTypes.string,
    error: PropTypes.string,
  }),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Input.defaultProps = {
  inputLabelContainerClassName: '',
  inputContainerClassName: '',
  inputClassName: '',
  type: 'text',
  value: '',
  errorMessage: {},
  required: true,
  disabled: false,
  children: null,
};

export default Input;
