import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Input.scss';

const Input = ({
  name, inputContainerClassName, label, type, value, errorMessage, required, onChangeHandler,
}) => {
  const getInputClassName = (field) => {
    if (field === errorMessage.field) {
      return styles.inputError;
    }
    return styles.input;
  };

  const renderErrorMessage = (field) => {
    return field === errorMessage.field
      && (<div className={styles.errorMessage}>{errorMessage.error}</div>);
  };

  return (
    <>
      <div className={clsx(styles.inputContainer, inputContainerClassName)}>
        <label htmlFor="input">{label}</label>
        <div>
          <input
            className={getInputClassName(name)}
            type={type}
            value={value}
            required={required}
            onChange={(e) => onChangeHandler(e, name)}
          />
          {renderErrorMessage(name)}
        </div>
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputContainerClassName: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.shape({
    field: PropTypes.string,
    error: PropTypes.string,
  }),
  required: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
};

Input.defaultProps = {
  inputContainerClassName: '',
  type: 'text',
  value: '',
  errorMessage: {},
  required: true,
};

export default Input;
