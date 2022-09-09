import { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Input.scss';

const Input = ({
  name,
  inputContainerClassName,
  inputClassName,
  label,
  type,
  value,
  errorMessage,
  required,
  onChangeHandler,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

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
      <div className={clsx(styles.inputContainer, inputContainerClassName)}>
        <label htmlFor="input">{label}</label>

        { type === 'password'
          ? (
            <div className={styles.inputPasswordContainer}>
              <input
                className={getInputClassName(name)}
                type={isShowPassword ? 'text' : 'password'}
                value={value}
                required={required}
                onChange={(e) => onChangeHandler(e, name)}
              />
              <i className={isShowPassword ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setIsShowPassword(!isShowPassword)} />
            </div>
          ) : (
            <input
              className={getInputClassName(name)}
              type={type}
              value={value}
              required={required}
              onChange={(e) => onChangeHandler(e, name)}
            />
          )}
        {renderErrorMessage(name)}
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
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
};

Input.defaultProps = {
  inputContainerClassName: '',
  inputClassName: '',
  type: 'text',
  value: '',
  errorMessage: {},
  required: true,
};

export default Input;
