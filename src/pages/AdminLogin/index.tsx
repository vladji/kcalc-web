import { ChangeEvent, useState } from "react";
import bcrypt from "bcryptjs-react";
import { Button } from "../../components/UI/Button";
import styles from "./styles.module.scss";

export const AdminLogin = () => {
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const onName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const onSend = () => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    console.log('pass', pass);
    console.log("hash", hash);
  };

  return (
    <section className={styles.wrapper}>
      <h1>Hello Elya!</h1>
      <input className={styles.input} type="text" placeholder="name" onChange={onName} />
      <input className={styles.input} type="text" placeholder="password" onChange={onPassword} />
      <Button handler={onSend}>
        <span>Login</span>
      </Button>
    </section>
  );
};
