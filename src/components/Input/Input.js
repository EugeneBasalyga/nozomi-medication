import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Input.css';

const Input = ({
  name, className, label, type, errorMessage, required, onChangeHandler,
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
      <div className={clsx(styles.inputContainer, className)}>
        <label htmlFor="input">{label}</label>
        <input
          className={getInputClassName(name)}
          type={type}
          required={required}
          onChange={onChangeHandler}
        />
      </div>
      {renderErrorMessage(name)}
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  errorMessage: PropTypes.shape({
    field: PropTypes.string,
    error: PropTypes.string,
  }),
  required: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
};

Input.defaultProps = {
  className: '',
  type: 'text',
  errorMessage: {},
  required: true,
};

export default Input;
