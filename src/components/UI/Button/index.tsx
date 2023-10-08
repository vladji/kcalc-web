import { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface ButtonProps {
  children: ReactNode;
  handler: () => void;
  outlined?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  handler,
  outlined = false,
  disabled = false
}) => {
  const onClick = () => {
    handler();
  };

  return (
    <button
      disabled={disabled}
      className={cn(styles.wrapper, { [styles.outlined]: outlined }, { [styles.disabled]: disabled })}
      onClick={onClick}>
      {children}
    </button>
  );
};
