import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <button className={styles.closeCross} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};
