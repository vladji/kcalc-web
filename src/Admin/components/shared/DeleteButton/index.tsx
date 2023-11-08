import React, { FC } from 'react';
import styles from './styles.module.scss';

interface DeleteButtonProps {
  handler: () => void;
  disabled?: boolean;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ handler, disabled }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handler();
  };

  return (
    <button className={styles.deleteButton} onClick={onClick} disabled={disabled}>
      X
    </button>
  );
};
