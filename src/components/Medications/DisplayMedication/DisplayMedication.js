import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';

import styles from './DisplayMedication.scss';

const DisplayMedication = ({ medication, editMedication, deleteMedication }) => {
  return (
    <>
      <h3 className={styles.medicationHeader}>Medication</h3>
      <div className={styles.medicationDisplayContainer}>
        <div>
          {`Name: ${medication.name}`}
        </div>
        <div>
          {`Description: ${medication.description}`}
        </div>
        <div>
          {`Current count: ${medication.count}`}
        </div>
        <div>
          {`Destination count: ${medication.destinationCount}`}
        </div>
      </div>
      <div className={styles.medicationButtonContainer}>
        <Button className={styles.buttonEdit} value="Edit" onClickHandler={editMedication} />
        <Button className={styles.buttonDelete} value="Delete" onClickHandler={deleteMedication} />
      </div>
    </>
  );
};

DisplayMedication.propTypes = {
  medication: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    destinationCount: PropTypes.number,
  }).isRequired,
  editMedication: PropTypes.func.isRequired,
  deleteMedication: PropTypes.func.isRequired,
};

export default DisplayMedication;
