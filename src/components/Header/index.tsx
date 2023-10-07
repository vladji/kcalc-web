import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./styles.module.scss";

interface HeaderProps {
  text: string;
}

export const Header: FC<HeaderProps> = ({ text }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link className={styles.logoLink} to="/">
          <img className={styles.logo} src={logo} alt="logo" />
          <span className={styles.text}>{text}</span>
        </Link>
      </div>
    </header>
  );
};
