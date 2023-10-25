import { ChangeEvent, FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface TextAreaProps {
  handler: (value: string) => void;
  initialValue: string;
  isReset: boolean;
  active: boolean;
  rows?: number;
  cols?: number;
  className?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  handler,
  initialValue,
  isReset,
  active,
  rows = 5,
  cols = 60,
  className,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(value);
    handler(value);
  };

  useEffect(() => {
    if (isReset) {
      setValue(initialValue);
    }
  }, [isReset, initialValue]);

  return (
    <textarea
      className={cn(className, { [styles.active]: active })}
      rows={rows}
      cols={cols}
      onChange={onChange}
      value={value}
      readOnly={!active}
    />
  );
};
