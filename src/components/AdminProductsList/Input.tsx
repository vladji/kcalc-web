import { ChangeEvent, FC, useEffect, useState } from "react";

interface InputProps {
  initialValue: string;
  handler: (value: string) => void;
  readOnly: boolean;
  isReset: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  initialValue,
  handler,
  readOnly = true,
  isReset,
  className
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
      className={className}
      type="text"
      readOnly={readOnly}
      value={value}
      onChange={onChange}
    />
  );
};
