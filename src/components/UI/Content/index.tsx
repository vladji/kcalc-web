import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface ContentProps {
  children: ReactNode;
  className?: string;
}

export const Content: FC<ContentProps> = ({ children, className }) => {
  return (
    <div className={cn(styles.contentWrapper, className)}>
      {children}
    </div>
  );
};
