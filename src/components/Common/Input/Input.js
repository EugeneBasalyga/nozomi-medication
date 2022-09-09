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
  onChangeHandler,
  children,
}) => {
  const getInputClassName = (field) => {
    if (field === errorMessage.field) {
      return clsx(styles.inputError, inputClassName);
    }
    return clsx(styles.input, inputClassName);
  };

  const renderErrorMessage = (field) => {
    return field === errorMessage.field
      && (<div className={styles.errorMessage}>{errorMessage.error}</div>);
  };

  return (
    <>
      <div className={clsx(styles.inputLabelContainer, inputLabelContainerClassName)}>
        <label htmlFor="input">{label}</label>
        <div className={inputContainerClassName}>
          <input
            className={getInputClassName(name)}
            type={type}
            value={value}
            required={required}
            onChange={(e) => onChangeHandler(e, name)}
          />
          {children}
        </div>
        {renderErrorMessage(name)}
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
  children: null,
};

export default Input;
