import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface SpinnerProps {
  color?: 'grayColor';
  size?: 'small';
}

export const Spinner: FC<SpinnerProps> = ({ color = '', size = '' }) => {
  return (
    <div className={cn(styles.spinner, { [styles[color]]: color }, { [styles[size]]: size })}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
