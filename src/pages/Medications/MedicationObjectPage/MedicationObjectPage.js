import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import medicationApiInstance from '../../../services/api/medications';
import EditMedication from '../../../components/Medications/EditMedication/EditMedication';
import DisplayMedication from '../../../components/Medications/DisplayMedication/DisplayMedication';
import { MEDICATIONS } from '../../../router/consts';

import styles from './MedicationObjectPage.css';

const MedicationObjectPage = () => {
  const { id } = useParams();
  const [medication, setMedication] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    medicationApiInstance.getMedicationById(id)
      .then((data) => setMedication(data))
      .catch((err) => console.log(err));
  }, [id]);

  const saveMedication = (editMedication) => {
    const med = editMedication;
    med.count = parseInt(editMedication.count, 10);
    med.destinationCount = parseInt(editMedication.destinationCount, 10);
    medicationApiInstance.updateMedication(med.id, med)
      .then(() => {
        medicationApiInstance.getMedicationById(med.id)
          .then((data) => {
            setMedication(data);
            setIsEditMode(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const cancelEditMedication = () => {
    setIsEditMode(false);
  };

  const editMedication = () => {
    setIsEditMode(true);
  };

  const deleteMedication = () => {
    medicationApiInstance.deleteMedication(medication.id)
      .then(() => navigate(MEDICATIONS))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.medicationObjectPageContainer}>
      <div className={styles.medicationObjectPageForm}>
        { isEditMode
          ? (
            <EditMedication
              medication={medication}
              onSaveMedicationHandler={saveMedication}
              onCancelEditMedicationHandler={cancelEditMedication}
            />
          )
          : (
            <DisplayMedication
              medication={medication}
              onEditMedicationHandler={editMedication}
              onDeleteMedicationHandler={deleteMedication}
            />
          )}
      </div>
    </div>
  );
};

export default MedicationObjectPage;
