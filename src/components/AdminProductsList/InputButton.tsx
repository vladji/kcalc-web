import { FC } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface InputButtonProps {
  text: string;
  handler: () => void;
  alert?: boolean;
  gray?: boolean;
}

export const InputButton: FC<InputButtonProps> = ({
  text,
  handler,
  alert = false,
  gray = false
}) => {
  const onClick = () => {
    handler();
  };
  return (
    <button
      className={cn(styles.inputButton, { [styles.alert]: alert }, { [styles.gray]: gray })}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};
