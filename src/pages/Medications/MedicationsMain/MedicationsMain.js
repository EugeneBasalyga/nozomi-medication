import { useState, useEffect } from 'react';

import medicationApiInstance from '../../../services/api/medications';
import MedicationsList from '../../../components/Medications/MedicationsList/MedicationsList';
import NewMedication from '../../../components/Medications/EditMedication/EditMedication';

import styles from './MedicationsMain.css';

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

  const saveNewMedication = (newMedication) => {
    const med = newMedication;
    med.count = parseInt(newMedication.count, 10);
    med.destinationCount = parseInt(newMedication.destinationCount, 10);
    medicationApiInstance.createMedication(med)
      .then(() => {
        medicationApiInstance.getMedications()
          .then((data) => {
            setMedications(data);
            setIsShowNewMedication(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const incrementMedicationCurrentCount = (currentCount) => {
    console.log(currentCount);
  };

  const decrementMedicationCurrentCount = (currentCount) => {
    console.log(currentCount);
  };

  return (
    <div className={styles.medicationsMainContainer}>
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
              onSaveMedicationHandler={saveNewMedication}
              onCancelEditMedicationHandler={cancelNewMedication}
            />
          </div>
        ) : null }
    </div>
  );
};

export default MedicationsMain;
