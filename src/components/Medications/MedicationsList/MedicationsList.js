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
        {medications.map((item) => (
          <MedicationListItem
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
