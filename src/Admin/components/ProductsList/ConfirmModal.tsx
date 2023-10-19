import { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../components/UI/Button';
import { Loader } from '../../../components/UI/Loader';

interface ConfirmModalProps {
  confirmHandler: () => void;
  cancelHandler: () => void;
  loading: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ confirmHandler, cancelHandler, loading }) => {
  return (
    <div className={styles.confirmModal}>
      {loading && <Loader />}
      <p>Уверена?</p>
      <div className={styles.buttonsWrapper}>
        <Button handler={confirmHandler}>
          <span>ДА</span>
        </Button>
        <Button handler={cancelHandler} outlined>
          <span>Отменить</span>
        </Button>
      </div>
    </div>
  );
};
