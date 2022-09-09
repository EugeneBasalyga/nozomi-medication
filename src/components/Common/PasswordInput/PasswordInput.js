import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './PasswordInput.scss';
import Input from '../Input/Input';

const PasswordInput = ({
  name,
  inputLabelContainerClassName,
  inputClassName,
  label,
  value,
  errorMessage,
  onChangeHandler,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <Input
        name={name}
        inputLabelContainerClassName={inputLabelContainerClassName}
        inputContainerClassName={styles.inputPasswordContainer}
        inputClassName={inputClassName}
        label={label}
        type={isShowPassword ? 'text' : 'password'}
        value={value}
        errorMessage={errorMessage}
        required
        onChangeHandler={onChangeHandler}
      >
        <i className={isShowPassword ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setIsShowPassword(!isShowPassword)} />
      </Input>
    </>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputLabelContainerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.shape({
    field: PropTypes.string,
    error: PropTypes.string,
  }),
  onChangeHandler: PropTypes.func.isRequired,
};

PasswordInput.defaultProps = {
  inputLabelContainerClassName: '',
  inputClassName: '',
  value: '',
  errorMessage: {},
};

export default PasswordInput;
