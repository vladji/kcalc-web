import { FC, ReactNode } from "react";
import styles from './styles.module.scss';

interface ButtonProps {
  children: ReactNode;
  handler: () => void;
}

export const Button: FC<ButtonProps> = ({ children, handler }) => {
  return (
    <button className={styles.wrapper} onClick={handler}>
      {children}
    </button>
  )
}
