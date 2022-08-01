import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';
import { MEDICATIONS } from '../../../router/consts';

import styles from './MedicationListItem.css';

const MedicationListItem = ({
  item,
  onIncrementMedicationCurrentCount,
  onDecrementMedicationCurrentCount,
}) => {
  const incrementMedicationCurrentCount = (e) => {
    e.stopPropagation();
    onIncrementMedicationCurrentCount(item.count);
  };

  const decrementMedicationCurrentCount = (e) => {
    e.stopPropagation();
    onDecrementMedicationCurrentCount(item.count);
  };

  return (
    <Link to={`${MEDICATIONS}/${item.id}`} className={styles.link}>
      <div className={styles.medicationsListItem}>
        <div>
          {`Name: ${item.name}`}
        </div>
        <div>
          {`Description: ${item.description}`}
        </div>
        <div className={styles.counterContainer}>
          Current count:
          <Button className={styles.counterButton} value="+" onClick={incrementMedicationCurrentCount} />
          {item.count}
          <Button className={styles.counterButton} value="-" onClick={decrementMedicationCurrentCount} />
        </div>
        <div>
          {`Destination count: ${item.destinationCount}`}
        </div>
      </div>
    </Link>
  );
};

MedicationListItem.propTypes = {
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

export default MedicationListItem;
