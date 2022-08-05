import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';
import { MEDICATIONS } from '../../../router/consts';

import styles from './MedicationListItem.css';

const MedicationListItem = ({
  medicationItemClassName,
  medicationItemCounterButtonsClassName,
  item,
  onIncrementMedicationCurrentCount,
  onDecrementMedicationCurrentCount,
}) => {
  return (
    <Link to={`${MEDICATIONS}/${item.id}`} className={styles.link}>
      <div className={clsx(styles.medicationsListItem, medicationItemClassName)}>
        <div>
          {`Name: ${item.name}`}
        </div>
        <div>
          {`Description: ${item.description}`}
        </div>
        <div className={styles.counterContainer}>
          Current count:
          {item.count !== item.destinationCount ? <Button className={clsx(styles.counterButton, medicationItemCounterButtonsClassName)} value="+" onClickHandler={(e) => onIncrementMedicationCurrentCount(e, item)} /> : null}
          {` ${item.count} `}
          {item.count !== 0 ? <Button className={clsx(styles.counterButton, medicationItemCounterButtonsClassName)} value="-" onClickHandler={(e) => onDecrementMedicationCurrentCount(e, item)} /> : null}
        </div>
        <div>
          {`Destination count: ${item.destinationCount}`}
        </div>
      </div>
    </Link>
  );
};

MedicationListItem.propTypes = {
  medicationItemClassName: PropTypes.string,
  medicationItemCounterButtonsClassName: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    destinationCount: PropTypes.number,
  }).isRequired,
  onIncrementMedicationCurrentCount: PropTypes.func.isRequired,
  onDecrementMedicationCurrentCount: PropTypes.func.isRequired,
};

MedicationListItem.defaultProps = {
  medicationItemClassName: '',
  medicationItemCounterButtonsClassName: '',
};

export default MedicationListItem;
