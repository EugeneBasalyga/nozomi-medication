import PropTypes from 'prop-types';

import styles from './Input.css';

const Input = ({
  label, type, required, onChangeHandler,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="input">{label}</label>
      <input type={type} required={required} onChange={onChangeHandler} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
  required: true,
};

export default Input;
