import { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';
import Modal from '../../Common/Modal/Modal';

import styles from './CreateMedicationModal.scss';

const CreateMedicationModal = ({
  show,
  onCancel,
  saveMedication,
}) => {
  const [newMedication, setNewMedication] = useState({
    name: '',
    description: '',
    count: 0,
    destinationCount: 0,
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const medicationInputOnChange = (e, name) => {
    const medication = { ...newMedication };
    medication[name] = e.target.value;
    setNewMedication(medication);
    const errorMessagesCopy = errorMessages.filter((el) => el.field !== name);
    setErrorMessages(errorMessagesCopy);
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
    } else {
      setNewMedication({
        name: '',
        description: '',
        count: 0,
        destinationCount: 0,
      });
      setErrorMessages([]);
      onCancel();
    }
  };

  return (
    <>
      <Modal
        title="Add Medication"
        onClose={() => {
          setNewMedication({
            name: '',
            description: '',
            count: 0,
            destinationCount: 0,
          });
          setErrorMessages([]);
          onCancel();
        }}
        show={show}
        modalContentClassName={styles.createMedicationModalContent}
        footerContentContainer={(
          <div className={styles.createMedicationModalFooterButtonContainer}>
            <Button className={styles.buttonSave} value="Save" onClickHandler={onSaveMedication} />
            <Button
              className={styles.buttonCancel}
              value="Cancel"
              onClickHandler={() => {
                setNewMedication({
                  name: '',
                  description: '',
                  count: 0,
                  destinationCount: 0,
                });
                setErrorMessages([]);
                onCancel();
              }}
            />
          </div>
        )}
      >
        <Input name="name" inputLabelContainerClassName={styles.medicationInputLabelContainer} inputClassName={styles.medicationInput} label="Name:" value={newMedication.name} errorMessage={errorMessages.find((error) => error.field === 'name')} onChangeHandler={medicationInputOnChange} />
        <Input name="description" inputLabelContainerClassName={styles.medicationInputLabelContainer} label="Description:" type="description" value={newMedication.description} errorMessage={errorMessages.find((error) => error.field === 'description')} onChangeHandler={medicationInputOnChange} />
        <Input name="count" inputLabelContainerClassName={styles.medicationInputLabelContainer} inputClassName={styles.medicationInput} label="Initial count:" value={newMedication.count} errorMessage={errorMessages.find((error) => error.field === 'count')} onChangeHandler={medicationInputOnChange} />
        <Input name="destinationCount" inputLabelContainerClassName={styles.medicationInputLabelContainer} inputClassName={styles.medicationInput} label="Destination count:" value={newMedication.destinationCount} errorMessage={errorMessages.find((error) => error.field === 'destinationCount')} onChangeHandler={medicationInputOnChange} />
      </Modal>
    </>
  );
};

CreateMedicationModal.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  saveMedication: PropTypes.func.isRequired,
};

CreateMedicationModal.defaultProps = {
  show: false,
};

export default CreateMedicationModal;
