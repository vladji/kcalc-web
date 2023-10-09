import { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface ButtonProps {
  children: ReactNode;
  handler: () => void;
  outlined?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  handler,
  outlined = false,
  disabled = false,
  className
}) => {
  const onClick = () => {
    handler();
  };

  return (
    <button
      disabled={disabled}
      className={cn(styles.wrapper, className, { [styles.outlined]: outlined }, { [styles.disabled]: disabled })}
      onClick={onClick}>
      {children}
    </button>
  );
};
