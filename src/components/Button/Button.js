import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Button.css';

const Button = ({ className, value, onClickHandler }) => {
  return (
    <button className={clsx(styles.button, className)} type="submit" onClick={onClickHandler}>{value}</button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClickHandler: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onClickHandler: null,
};

export default Button;
