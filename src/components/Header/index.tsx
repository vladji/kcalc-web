import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../shared/Button';
import cn from 'classnames';
import styles from './styles.module.scss';

interface HeaderProps {
  text: string;
  linkTo?: string;
  isAdmin?: boolean;
}

export const Header: FC<HeaderProps> = ({ text, linkTo = '/', isAdmin = false }) => {
  const navigate = useNavigate();

  const adminLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className={cn(styles.header, 'layout-padding-inline')}>
      <div className={styles.content}>
        <Link className={styles.logoLink} to={linkTo}>
          <img className={styles.logo} src="/assets/images/logo.png" alt="logo" />
          <span className={styles.text}>{text}</span>
        </Link>
        {isAdmin && (
          <>
            <nav className={styles.navigation}>
              <Link to="/admin-products">Products</Link>
              <Link to="/admin-recipes">Recipes</Link>
              <Link to="/admin-user-products">User products</Link>
            </nav>
            <Button handler={adminLogout} outlined>
              <span>exit</span>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
