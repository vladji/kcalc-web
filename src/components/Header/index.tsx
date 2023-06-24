import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logoLink} to={'/'}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h1>kCalc</h1>
      </Link>
    </header>
  );
};
