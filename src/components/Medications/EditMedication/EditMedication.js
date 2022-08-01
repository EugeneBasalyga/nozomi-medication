import { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';

import styles from './EditMedication.css';

const EditMedication = ({
  medication, isNewMedication, onSaveMedicationHandler, onCancelEditMedicationHandler,
}) => {
  const [newMedication, setNewMedication] = useState(medication);

  const medicationInputOnChangeHandler = (e, name) => {
    switch (name) {
      case 'medicationName':
        setNewMedication({ ...newMedication, name: e.target.value });
        break;
      case 'medicationDescription':
        setNewMedication({ ...newMedication, description: e.target.value });
        break;
      case 'medicationCurrentCount':
        setNewMedication({ ...newMedication, count: e.target.value });
        break;
      case 'medicationDestinationCount':
        setNewMedication({ ...newMedication, destinationCount: e.target.value });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <h3 className={styles.medicationHeader}>Medication</h3>
      <Input name="medicationName" inputContainerClassName={styles.medicationInputContainer} label="Name:" value={newMedication.name} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="medicationDescription" inputContainerClassName={styles.medicationInputContainer} label="Description:" value={newMedication.description} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="medicationCurrentCount" inputContainerClassName={styles.medicationInputContainer} label={isNewMedication ? 'Initial Count:' : 'Current Count:'} value={newMedication.count} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="medicationDestinationCount" inputContainerClassName={styles.medicationInputContainer} label="Destination Count:" value={newMedication.destinationCount} required onChangeHandler={medicationInputOnChangeHandler} />
      <div className={styles.medicationButtonContainer}>
        <Button className={styles.buttonSave} value="Save" onClickHandler={() => onSaveMedicationHandler(newMedication)} />
        <Button className={styles.buttonCancel} value="Cancel" onClickHandler={onCancelEditMedicationHandler} />
      </div>
    </>
  );
};

EditMedication.propTypes = {
  medication: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    destinationCount: PropTypes.number,
  }),
  isNewMedication: PropTypes.bool,
  onSaveMedicationHandler: PropTypes.func.isRequired,
  onCancelEditMedicationHandler: PropTypes.func.isRequired,
};

EditMedication.defaultProps = {
  medication: {
    name: '',
    description: '',
    count: 0,
    destinationCount: 0,
  },
  isNewMedication: false,
};

export default EditMedication;
