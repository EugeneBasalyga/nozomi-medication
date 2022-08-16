import { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';

import styles from './EditMedication.scss';

const EditMedication = ({
  medication, isNewMedication, saveMedication, cancelEditMedication,
}) => {
  const [newMedication, setNewMedication] = useState(medication);
  const [errorMessages, setErrorMessages] = useState([]);

  const medicationInputOnChangeHandler = (e, name) => {
    const medication = { ...newMedication };
    medication[name] = e.target.value;
    setNewMedication(medication);
  };

  const onSaveMedication = async () => {
    const data = await saveMedication(newMedication);
    if (data.errors) {
      const errors = data.errors.map((error) => {
        return {
          field: error.param,
          error: error.msg,
        };
      });
      setErrorMessages(errors);
    } else if (isNewMedication) {
      setNewMedication({
        name: '',
        description: '',
        count: 0,
        destinationCount: 0,
      });
      setErrorMessages([]);
    }
  };

  return (
    <>
      <h3 className={styles.medicationHeader}>Medication</h3>
      <Input name="name" inputContainerClassName={styles.medicationInputContainer} label="Name:" value={newMedication.name} errorMessage={errorMessages.find((error) => error.field === 'name')} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="description" inputContainerClassName={styles.medicationInputContainer} label="Description:" value={newMedication.description} errorMessage={errorMessages.find((error) => error.field === 'description')} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="count" inputContainerClassName={styles.medicationInputContainer} label={isNewMedication ? 'Initial Count:' : 'Current Count:'} value={newMedication.count} errorMessage={errorMessages.find((error) => error.field === 'count')} required onChangeHandler={medicationInputOnChangeHandler} />
      <Input name="destinationCount" inputContainerClassName={styles.medicationInputContainer} label="Destination Count:" value={newMedication.destinationCount} errorMessage={errorMessages.find((error) => error.field === 'destinationCount')} required onChangeHandler={medicationInputOnChangeHandler} />
      <div className={styles.medicationButtonContainer}>
        <Button className={styles.buttonSave} value="Save" onClickHandler={onSaveMedication} />
        <Button className={styles.buttonCancel} value="Cancel" onClickHandler={cancelEditMedication} />
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
  saveMedication: PropTypes.func.isRequired,
  cancelEditMedication: PropTypes.func.isRequired,
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
