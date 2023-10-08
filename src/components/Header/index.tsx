import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";
import logo from "../../assets/logo.png";
import { Button } from "../UI/Button";
import styles from "./styles.module.scss";

interface HeaderProps {
  text: string;
  linkTo?: string;
  isAdmin?: boolean;
}

export const Header: FC<HeaderProps> = ({ text, linkTo = "/", isAdmin = false }) => {
  const navigate = useNavigate();

  const adminLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className={cn(styles.header, 'layout-padding-inline')}>
      <div className={styles.content}>
        <Link className={styles.logoLink} to={linkTo}>
          <img className={styles.logo} src={logo} alt="logo" />
          <span className={styles.text}>{text}</span>
        </Link>
        {isAdmin &&
          <Button handler={adminLogout} outlined>
            <span>exit</span>
          </Button>
        }
      </div>
    </header>
  );
};
