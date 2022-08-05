import { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';

import styles from './EditMedication.css';

const EditMedication = ({
  medication, isNewMedication, onSaveMedicationHandler, onCancelEditMedicationHandler,
}) => {
  const [newMedication, setNewMedication] = useState(medication);
  const [errorMessages, setErrorMessages] = useState([]);

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

  const medicationInputsAreValid = () => {
    const errors = [];
    if (newMedication.name.length === 0) {
      errors.push({
        field: 'medicationName',
        error: 'Medication name cannot be empty',
      });
    }
    if (newMedication.description.length === 0) {
      errors.push({
        field: 'medicationDescription',
        error: 'Medication description cannot be empty',
      });
    }
    if (newMedication.count.length === 0) {
      errors.push({
        field: 'medicationCurrentCount',
        error: 'Medication count cannot be empty',
      });
    } else {
      const count = parseInt(newMedication.count, 10);
      if (Number.isNaN(count) || count < 0) {
        errors.push({
          field: 'medicationCurrentCount',
          error: 'Medication count should be a numeric value not less than 0',
        });
      }
    }
    if (newMedication.destinationCount.length === 0) {
      errors.push({
        field: 'medicationDestinationCount',
        error: 'Medication destination count cannot be empty',
      });
    } else {
      const destinationCount = parseInt(newMedication.destinationCount, 10);
      if (Number.isNaN(destinationCount) || destinationCount <= 0) {
        errors.push({
          field: 'medicationDestinationCount',
          error: 'Medication destination count should be a numeric value greater than 0',
        });
      } else {
        const count = parseInt(newMedication.count, 10);
        if (!Number.isNaN(count) && !Number.isNaN(destinationCount)) {
          if (destinationCount <= count) {
            errors.push({
              field: 'medicationDestinationCount',
              error: 'Medication destination count should be greater than medication count',
            });
          }
        }
      }
    }
    if (errors.length !== 0) {
      setErrorMessages(errors);
      return false;
    }
    return true;
  };

  const onSaveMedication = () => {
    if (medicationInputsAreValid()) {
      onSaveMedicationHandler(newMedication);
    }
  };

  return (
    <>
      <h3 className={styles.medicationHeader}>Medication</h3>
      <Input name="medicationName" inputContainerClassName={styles.medicationInputContainer} label="Name:" value={newMedication.name} errorMessage={errorMessages.find((error) => error.field === 'medicationName')} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="medicationDescription" inputContainerClassName={styles.medicationInputContainer} label="Description:" value={newMedication.description} errorMessage={errorMessages.find((error) => error.field === 'medicationDescription')} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="medicationCurrentCount" inputContainerClassName={styles.medicationInputContainer} label={isNewMedication ? 'Initial Count:' : 'Current Count:'} value={newMedication.count} errorMessage={errorMessages.find((error) => error.field === 'medicationCurrentCount')} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="medicationDestinationCount" inputContainerClassName={styles.medicationInputContainer} label="Destination Count:" value={newMedication.destinationCount} errorMessage={errorMessages.find((error) => error.field === 'medicationDestinationCount')} required onChangeHandler={medicationInputOnChangeHandler} />
      <div className={styles.medicationButtonContainer}>
        <Button className={styles.buttonSave} value="Save" onClickHandler={onSaveMedication} />
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
