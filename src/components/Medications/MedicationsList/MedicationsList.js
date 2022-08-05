import PropTypes from 'prop-types';

import MedicationListItem from '../MedicationListItem/MedicationListItem';
import Button from '../../Common/Button/Button';

import styles from './MedicationsList.css';

const MedicationsList = ({
  medications,
  onAddNewMedicationHandler,
  onIncrementMedicationCurrentCount,
  onDecrementMedicationCurrentCount,
}) => {
  return (
    <>
      <div>
        {medications.sort((firstItem, secItem) => secItem.updatedAt - firstItem.updatedAt)
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

      <Button className={styles.buttonAddNewMedication} value="Add New Medication" onClickHandler={onAddNewMedicationHandler} />
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
