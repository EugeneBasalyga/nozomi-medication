import { useState, useEffect } from 'react';

import medicationApiInstance from '../../services/api/medications';

import styles from './MedicationsList.css';

const MedicationsList = () => {
  const [medication, setMedication] = useState({});
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    medicationApiInstance.getMedications()
      .then((data) => setMedications(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setMedication({
      name: e.target.value,
      count: 0,
      destinationCount: 0,
    });
  };

  const handleSubmit = (e) => {
    if (medication) {
      setMedications(medications.concat(medication));
    }

    setMedication({});

    e.preventDefault();
  };

  return (
    <div className={styles.medicationsContainer}>
      <ul className={styles.medicationsList}>
        {medications.map((item) => (
          <li key={item.name}>
            <div>
              {`Name: ${item.name}`}
            </div>
            <div>
              {`Count: ${item.count}`}
            </div>
            <div>
              {`Destination count: ${item.destinationCount}`}
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={medication.name} onChange={handleChange} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default MedicationsList;
