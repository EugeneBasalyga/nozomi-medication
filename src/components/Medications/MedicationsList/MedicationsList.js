import PropTypes from 'prop-types';

import { useAuth } from '../../../contexts/auth';
import MedicationListItem from '../MedicationListItem/MedicationListItem';
import Button from '../../Common/Button/Button';

import styles from './MedicationsList.scss';

const MedicationsList = ({
  medications,
  onAddNewMedicationHandler,
  onIncrementMedicationCurrentCount,
  onDecrementMedicationCurrentCount,
}) => {
  const { logout } = useAuth();

  return (
    <>
      <div>
        {medications.sort((firstItem, secItem) => secItem.createdAt - firstItem.createdAt)
          .filter((item) => item.count !== item.destinationCount).map((item) => (
            <MedicationListItem
              key={item.id}
              item={item}
              onIncrementMedicationCurrentCount={onIncrementMedicationCurrentCount}
              onDecrementMedicationCurrentCount={onDecrementMedicationCurrentCount}
            />
          ))}
        {medications.sort((firstItem, secItem) => secItem.updatedAt - firstItem.updatedAt)
          .filter((item) => item.count === item.destinationCount).map((item) => (
            <MedicationListItem
              medicationItemClassName={styles.medicationItemFulfilled}
              medicationItemCounterButtonsClassName={styles.medicationItemCounterButtonFulfilled}
              key={item.id}
              item={item}
              onIncrementMedicationCurrentCount={onIncrementMedicationCurrentCount}
              onDecrementMedicationCurrentCount={onDecrementMedicationCurrentCount}
            />
          ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} value="Add New Medication" onClickHandler={onAddNewMedicationHandler} />
        <Button className={styles.button} value="Sign out" onClickHandler={logout} />
      </div>
    </>

  );
};

MedicationsList.propTypes = {
  medications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    destinationCount: PropTypes.number,
  })).isRequired,
  onAddNewMedicationHandler: PropTypes.func.isRequired,
  onIncrementMedicationCurrentCount: PropTypes.func.isRequired,
  onDecrementMedicationCurrentCount: PropTypes.func.isRequired,
};

export default MedicationsList;
