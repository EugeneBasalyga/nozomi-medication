import { useState, useEffect } from 'react';

import { sendNotify } from '../../../components/Common/Notification/GlobalNotify';
import medicationApiInstance from '../../../services/api/medications';
import Button from '../../../components/Common/Button/Button';
import MedicationsList from '../../../components/Medications/MedicationsList/MedicationsList';
import CreateMedicationModal from '../../../components/Medications/CreateMedicationModal/CreateMedicationModal';
import { useAuth } from '../../../contexts/auth';

import styles from './MedicationsMain.scss';

const MedicationsMain = () => {
  const [isShowNewMedicationModal, setIsShowNewMedicationModal] = useState(false);
  const [medications, setMedications] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    medicationApiInstance.getMedications()
      .then((data) => setMedications(data))
      .catch((err) => console.log(err));
  }, []);

  const saveNewMedication = async (newMedication) => {
    try {
      const data = await medicationApiInstance.createMedication(newMedication);
      const medicationsUpd = [...medications];
      medicationsUpd.push(data);
      setMedications(medicationsUpd);
      sendNotify('Medication has been successfully created', 'success');
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  const incrementMedicationCurrentCount = (e, medication) => {
    e.stopPropagation();
    const medicationCount = medication.count + 1;
    updateMedicationCurrentCount(medication.id, medicationCount);
  };

  const decrementMedicationCurrentCount = (e, medication) => {
    e.stopPropagation();
    const medicationCount = medication.count - 1;
    updateMedicationCurrentCount(medication.id, medicationCount);
  };

  const updateMedicationCurrentCount = (medicationId, medicationCount) => {
    medicationApiInstance.updateMedicationCurrentCount(medicationId, medicationCount)
      .then((data) => {
        const medicationIndex = medications.findIndex((medication) => {
          return medication.id === medicationId;
        });
        const medicationsUpd = [...medications];
        medicationsUpd[medicationIndex] = data;
        setMedications(medicationsUpd);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={styles.medicationsMainBoxContainer}>
        <div className={styles.medicationsListHeaderContainer}>
          <div className={styles.medicationsListHeader}>
            <h4>{`Medications for ${auth.user.email}`}</h4>
          </div>
          <div className={styles.medicationsListHeaderButtons}>
            <Button className={styles.buttonSignOut} value="Sign out" onClickHandler={auth.logout} />
          </div>
        </div>
        <div className={styles.medicationsListContainer}>
          <MedicationsList
            medications={medications}
            onIncrementMedicationCurrentCount={incrementMedicationCurrentCount}
            onDecrementMedicationCurrentCount={decrementMedicationCurrentCount}
          />
          <Button className={styles.buttonAddMedication} value="Add medication" onClickHandler={() => setIsShowNewMedicationModal(true)} />
        </div>
      </div>
      <CreateMedicationModal
        show={isShowNewMedicationModal}
        onCancel={() => setIsShowNewMedicationModal(false)}
        saveMedication={saveNewMedication}
      />
    </>
  );
};

export default MedicationsMain;
