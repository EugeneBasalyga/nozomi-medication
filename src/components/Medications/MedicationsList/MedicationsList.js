import PropTypes from 'prop-types';

import MedicationListItem from '../MedicationListItem/MedicationListItem';

import styles from './MedicationsList.scss';

const MedicationsList = ({
  medications,
  onIncrementMedicationCurrentCount,
  onDecrementMedicationCurrentCount,
}) => {
  return (
    <>
      <table className={styles.medicationTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th className={styles.medicationTableDescriptionColumn}>Description</th>
            <th>Current count</th>
            <th>Destination count</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {medications.sort((firstItem, secItem) => secItem.createdAt - firstItem.createdAt)
            .filter((item) => item.count !== item.destinationCount).map((item) => (
              <MedicationListItem
                key={item.id}
                item={item}
                onIncrementMedicationCurrentCount={onIncrementMedicationCurrentCount}
                onDecrementMedicationCurrentCount={onDecrementMedicationCurrentCount}
              />
            ))}
          {medications.sort((firstItem, secItem) => secItem.createdAt - firstItem.createdAt)
            .filter((item) => item.count === item.destinationCount).map((item) => (
              <MedicationListItem
                key={item.id}
                item={item}
                onIncrementMedicationCurrentCount={onIncrementMedicationCurrentCount}
                onDecrementMedicationCurrentCount={onDecrementMedicationCurrentCount}
              />
            ))}
        </tbody>
      </table>
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
  onIncrementMedicationCurrentCount: PropTypes.func.isRequired,
  onDecrementMedicationCurrentCount: PropTypes.func.isRequired,
};

export default MedicationsList;
