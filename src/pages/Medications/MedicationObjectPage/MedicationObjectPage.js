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

  const saveMedication = async (editMedication) => {
    try {
      const data = await medicationApiInstance.updateMedication(editMedication.id, editMedication);
      setMedication(data);
      setIsEditMode(false);
      return data;
    } catch (err) {
      return err.response.data;
    }
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
              saveMedication={saveMedication}
              cancelEditMedication={cancelEditMedication}
            />
          )
          : (
            <DisplayMedication
              medication={medication}
              editMedication={editMedication}
              deleteMedication={deleteMedication}
            />
          )}
      </div>
    </div>
  );
};

export default MedicationObjectPage;
