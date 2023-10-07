import { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface ButtonProps {
  children: ReactNode;
  handler: () => void;
  outlined?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, handler, outlined = false }) => {
  return (
    <button className={cn(styles.wrapper, { [styles.outlined]: outlined })} onClick={handler}>
      {children}
    </button>
  );
};
