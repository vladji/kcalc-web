import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface SectionProps {
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({ children }) => {
  return (
    <section className={styles.section}>
      {children}
    </section>
  );
};
