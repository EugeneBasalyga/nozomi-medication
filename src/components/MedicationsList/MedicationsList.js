import { useState } from 'react';

import styles from './MedicationsList.css';

const medications = [
  {
    name: 'OxyContin',
    count: 5,
    destinationCount: 15,
  },
  {
    name: 'Baclofen',
    count: 0,
    destinationCount: 25,
  },
  {
    name: 'Celexa',
    count: 12,
    destinationCount: 12,
  },
];

const MedicationsList = () => {
  const [medication, setMedication] = useState({});
  const [medicationsList, setMedicationsList] = useState(medications);

  const handleChange = (e) => {
    setMedication({
      name: e.target.value,
      count: 0,
      destinationCount: 0,
    });
  };

  const handleSubmit = (e) => {
    if (medication) {
      setMedicationsList(medicationsList.concat(medication));
    }

    setMedication({});

    e.preventDefault();
  };

  return (
    <div className={styles.medicationsContainer}>
      <ul className={styles.medicationsList}>
        {medicationsList.map((item) => (
          <li key={item.name}>
            <div>
              <p>
                Name:
                {' '}
                {item.name}
              </p>
            </div>
            <div>
              <p>
                Count:
                {' '}
                {item.count}
              </p>
            </div>
            <div>
              <p>
                Destination count:
                {' '}
                {item.destinationCount}
              </p>
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
