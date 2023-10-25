import { ChangeEvent, FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface InputProps {
  initialValue: string;
  handler: (value: string) => void;
  isReset: boolean;
  active: boolean;
  className?: string;
  type?: 'text' | 'number';
}

export const Input: FC<InputProps> = ({
  initialValue,
  handler,
  isReset,
  active,
  className,
  type = 'text',
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (isReset) {
      setValue(initialValue);
    }
  }, [isReset, initialValue]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    handler(value);
  };

  return (
    <input
      className={cn(styles.wrapper, className, { [styles.active]: active })}
      type={type}
      readOnly={!active}
      value={value}
      onChange={onChange}
    />
  );
};
