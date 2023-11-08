import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface InputButtonProps {
  text: string;
  handler: () => void;
  alert?: boolean;
  gray?: boolean;
  brand?: boolean;
  className?: string;
  disabled?: boolean;
}

export const InputButton: FC<InputButtonProps> = ({
  text,
  handler,
  alert = false,
  gray = false,
  brand = false,
  className,
  disabled = false,
}) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handler();
  };
  return (
    <button
      className={cn(
        styles.inputButton,
        className,
        { [styles.alert]: alert },
        { [styles.gray]: gray },
        { [styles.brand]: brand },
        { [styles.disabled]: disabled }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};
