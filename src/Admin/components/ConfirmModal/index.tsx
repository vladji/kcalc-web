import { FC } from 'react';
import { Button } from '../../../components/shared/Button';
import { Loader } from '../../../components/shared/Loader';
import styles from './styles.module.scss';

interface ConfirmModalProps {
  confirmHandler: () => void;
  cancelHandler: () => void;
  loading?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  confirmHandler,
  cancelHandler,
  loading = false,
}) => {
  return (
    <div className={styles.confirmModal}>
      {loading && <Loader />}
      <p className={styles.text}>
        Точно? <span className={styles.emoji}>🤨</span>
      </p>
      <div className={styles.buttonsWrapper}>
        <Button handler={confirmHandler}>
          <span>ДА</span>
        </Button>
        <Button handler={cancelHandler} outlined>
          <span>НЕТ</span>
        </Button>
      </div>
    </div>
  );
};
