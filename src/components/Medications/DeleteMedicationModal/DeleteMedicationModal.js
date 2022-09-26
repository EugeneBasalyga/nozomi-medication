import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';
import Modal from '../../Common/Modal/Modal';

import styles from './DeleteMedicationModal.scss';

const DeleteMedicationModal = ({
  show,
  onCancel,
  deleteMedication,
}) => {
  return (
    <>
      <Modal
        title="Delete Medication"
        onClose={onCancel}
        show={show}
        modalContentClassName={styles.deleteMedicationModalContent}
        footerContentContainer={(
          <div className={styles.deleteMedicationModalFooterButtonContainer}>
            <Button className={styles.buttonCancel} value="No" onClickHandler={onCancel} />
            <Button className={styles.buttonDelete} value="Yes, Delete" onClickHandler={deleteMedication} />
          </div>
        )}
      >
        <div className={styles.deleteMedicationText}>
          Are you sure you want to delete this medication?
        </div>
      </Modal>
    </>
  );
};

DeleteMedicationModal.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  deleteMedication: PropTypes.func.isRequired,
};

DeleteMedicationModal.defaultProps = {
  show: false,
};

export default DeleteMedicationModal;
