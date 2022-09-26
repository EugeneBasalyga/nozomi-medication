import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MEDICATIONS } from '../../../router/consts';

import styles from './MedicationListItem.scss';

const MedicationListItem = ({
  item,
  onIncrementMedicationCurrentCount,
  onDecrementMedicationCurrentCount,
}) => {
  const navigate = useNavigate();

  const onClickMedicationItem = () => {
    navigate(`${MEDICATIONS}/${item.id}`);
  };

  return (
    <>
      <tr className={styles.medicationListItem} onClick={onClickMedicationItem}>
        <td className={styles.medicationTableDescriptionColumn}>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.count}</td>
        <td>{item.destinationCount}</td>
        <td>
          {item.count === item.destinationCount
            ? (
              <div className={styles.icons}>
                <div>
                  Completed
                </div>
                <div className={styles.iconContainer}>
                  <i className={`bi bi-check-square ${styles.iconGreen}`} />
                </div>
              </div>
            )
            : (
              <div className={styles.icons}>
                <div>
                  Not completed
                </div>
                <div className={styles.iconContainer}>
                  <i className={`bi bi-x-square ${styles.iconRed}`} />
                </div>
              </div>
            )}
        </td>
        <td>
          <div className={styles.icons}>
            {item.count !== item.destinationCount
              ? (
                <div className={styles.iconContainer}>
                  <i className={`bi bi-plus-circle ${styles.iconPlusDash} fa-lg`} onClick={(e) => onIncrementMedicationCurrentCount(e, item)} />
                </div>
              ) : null}
            {item.count !== 0
              ? (
                <div className={styles.iconContainer}>
                  <i className={`bi bi-dash-circle ${styles.iconPlusDash}`} onClick={(e) => onDecrementMedicationCurrentCount(e, item)} />
                </div>
              ) : null}
          </div>
        </td>
      </tr>
    </>
  );
};

MedicationListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    destinationCount: PropTypes.number,
  }).isRequired,
  onIncrementMedicationCurrentCount: PropTypes.func.isRequired,
  onDecrementMedicationCurrentCount: PropTypes.func.isRequired,
};

export default MedicationListItem;
