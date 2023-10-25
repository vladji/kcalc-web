import { FC, useEffect, useState } from 'react';
import { CheckIcon } from '../../../icons/CheckIcon';
import cn from 'classnames';
import styles from './styles.module.scss';

interface CheckBoxProps {
  active: boolean;
  initialChecked: boolean;
  text: string;
  clickHandler: (checked: boolean) => void;
  isReset: boolean;
}

export const CheckBox: FC<CheckBoxProps> = ({
  active,
  initialChecked,
  text,
  clickHandler,
  isReset,
}) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);

  const onChange = () => {
    setChecked((prev) => !prev);
    clickHandler(!checked);
  };

  useEffect(() => {
    if (isReset) {
      setChecked(initialChecked);
    }
  }, [isReset, initialChecked]);

  return (
    <button className={styles.button} onClick={onChange} disabled={!active}>
      <div className={cn(styles.checkBox, { [styles.checked]: checked })}>
        {checked && <CheckIcon color="#fff" />}
      </div>
      <span>{text}</span>
    </button>
  );
};
