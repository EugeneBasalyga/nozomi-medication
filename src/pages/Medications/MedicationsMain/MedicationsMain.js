import { useState, useEffect } from 'react';

import medicationApiInstance from '../../../services/api/medications';
import MedicationsList from '../../../components/Medications/MedicationsList/MedicationsList';
import NewMedication from '../../../components/Medications/EditMedication/EditMedication';

import styles from './MedicationsMain.scss';

const MedicationsMain = () => {
  const [isShowNewMedication, setIsShowNewMedication] = useState(false);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    medicationApiInstance.getMedications()
      .then((data) => setMedications(data))
      .catch((err) => console.log(err));
  }, []);

  const addNewMedication = () => {
    setIsShowNewMedication(true);
  };

  const cancelNewMedication = () => {
    setIsShowNewMedication(false);
  };

  const saveNewMedication = async (newMedication) => {
    try {
      const data = await medicationApiInstance.createMedication(newMedication);
      const medicationsUpd = [...medications];
      medicationsUpd.push(data);
      setMedications(medicationsUpd);
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  const incrementMedicationCurrentCount = (e, medication) => {
    e.preventDefault();
    const medicationCount = medication.count + 1;
    updateMedicationCurrentCount(medication.id, medicationCount);
  };

  const decrementMedicationCurrentCount = (e, medication) => {
    e.preventDefault();
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
    <div className={styles.medicationsMainContainer}>
      <div className={styles.medicationsMainPageTitle}>
        MEDICATIONS
      </div>
      <div className={styles.medicationsMainBoxContainer}>
        <div className={styles.medicationsListContainer}>
          <MedicationsList
            medications={medications}
            onAddNewMedicationHandler={addNewMedication}
            onIncrementMedicationCurrentCount={incrementMedicationCurrentCount}
            onDecrementMedicationCurrentCount={decrementMedicationCurrentCount}
          />
        </div>
        { isShowNewMedication
          ? (
            <div className={styles.newMedicationContainer}>
              <NewMedication
                isNewMedication
                saveMedication={saveNewMedication}
                cancelEditMedication={cancelNewMedication}
              />
            </div>
          ) : null }
      </div>
    </div>
  );
};

export default MedicationsMain;
