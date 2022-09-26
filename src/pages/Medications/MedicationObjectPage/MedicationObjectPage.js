import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { sendNotify } from '../../../components/Common/Notification/GlobalNotify';
import medicationApiInstance from '../../../services/api/medications';
import DeleteMedicationModal from '../../../components/Medications/DeleteMedicationModal/DeleteMedicationModal';
import Button from '../../../components/Common/Button/Button';
import Input from '../../../components/Common/Input/Input';
import { useAuth } from '../../../contexts/auth';
import { MEDICATIONS } from '../../../router/consts';

import styles from './MedicationObjectPage.scss';

const MedicationObjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const [medication, setMedication] = useState({});
  const [medicationCopy, setMedicationCopy] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isShowDeleteMedicationModal, setIsShowDeleteMedicationModal] = useState(false);

  useEffect(() => {
    medicationApiInstance.getMedicationById(id)
      .then((data) => {
        setMedication(data);
        setMedicationCopy(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const medicationInputOnChange = (e, name) => {
    const editMedication = { ...medicationCopy };
    editMedication[name] = e.target.value;
    setMedicationCopy(editMedication);
    const errorMessagesCopy = errorMessages.filter((el) => el.field !== name);
    setErrorMessages(errorMessagesCopy);
  };

  const saveMedication = async () => {
    try {
      const data = await medicationApiInstance.updateMedication(medicationCopy.id, medicationCopy);
      setMedication(data);
      setMedicationCopy(data);
      setIsEditMode(false);
      setErrorMessages([]);
      sendNotify('Medication has been successfully saved', 'success');
      return data;
    } catch (err) {
      const errors = err.response.data.errors.map((error) => {
        return {
          field: error.param,
          error: error.msg,
        };
      });
      setErrorMessages(errors);
      return err.response.data.errors;
    }
  };

  const cancelEditMedication = () => {
    setIsEditMode(false);
    setMedicationCopy(medication);
    setErrorMessages([]);
  };

  const editMedication = () => {
    setIsEditMode(true);
  };

  const deleteMedication = () => {
    medicationApiInstance.deleteMedication(medicationCopy.id)
      .then(() => {
        sendNotify('Medication has been successfully deleted', 'success');
        navigate(MEDICATIONS);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.medicationObjectPageContainer}>
      <div className={styles.medicationObjectPageHeaderContainer}>
        <div className={styles.medicationObjectPageHeader}>
          <h4>{medicationCopy.name}</h4>
        </div>
        <div className={styles.medicationObjectPageHeaderButtons}>
          <Button className={styles.buttonSignOut} value="Sign out" onClickHandler={auth.logout} />
        </div>
      </div>
      <div className={styles.medicationObjectPageForm}>
        <Input name="name" inputLabelContainerClassName={styles.medicationInputLabelContainer} inputClassName={styles.medicationInput} label="Name:" value={medicationCopy.name} errorMessage={errorMessages.find((error) => error.field === 'name')} disabled={!isEditMode} onChangeHandler={medicationInputOnChange} />
        <Input name="description" inputLabelContainerClassName={styles.medicationInputLabelContainer} label="Description:" type="description" value={medicationCopy.description} errorMessage={errorMessages.find((error) => error.field === 'description')} disabled={!isEditMode} onChangeHandler={medicationInputOnChange} />
        <Input name="count" inputLabelContainerClassName={styles.medicationInputLabelContainer} inputClassName={styles.medicationInput} label="Current count:" value={medicationCopy.count} errorMessage={errorMessages.find((error) => error.field === 'count')} disabled={!isEditMode} onChangeHandler={medicationInputOnChange} />
        <Input name="destinationCount" inputLabelContainerClassName={styles.medicationInputLabelContainer} inputClassName={styles.medicationInput} label="Destination count:" value={medicationCopy.destinationCount} errorMessage={errorMessages.find((error) => error.field === 'destinationCount')} disabled={!isEditMode} onChangeHandler={medicationInputOnChange} />
        {isEditMode
          ? (
            <div className={styles.medicationButtonContainer}>
              <Button className={styles.buttonSave} value="Save" onClickHandler={saveMedication} />
              <Button className={styles.buttonCancel} value="Cancel" onClickHandler={cancelEditMedication} />
            </div>
          )
          : (
            <div className={styles.medicationButtonContainer}>
              <Button className={styles.buttonEdit} value="Edit" onClickHandler={editMedication} />
              <Button className={styles.buttonDelete} value="Delete" onClickHandler={() => setIsShowDeleteMedicationModal(true)} />
            </div>
          )}
      </div>
      <DeleteMedicationModal
        show={isShowDeleteMedicationModal}
        onCancel={() => setIsShowDeleteMedicationModal(false)}
        deleteMedication={deleteMedication}
      />
    </div>
  );
};

export default MedicationObjectPage;
