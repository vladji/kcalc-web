import { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { Button } from '../../../components/shared/Button';
import { useAdminLogin } from '../../requests/login/useAdminLogin';
import { Layout } from '../../../components/Layout';
import styles from './styles.module.scss';

export const Login = () => {
  const [name, setName] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const { adminLogin, loading, errorMessage } = useAdminLogin();

  const onName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const onSend = async () => {
    if (name && pass) {
      await adminLogin({ name, pass });
    }
  };

  return (
    <Layout loading={loading}>
      <section className="section-wrapper">
        <div className={cn('content-wrapper', styles.content)}>
          <div className={styles.titleWrapper}>
            {!errorMessage && <h1>Hello Elya!</h1>}
            {!!errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
          </div>
          <input className={styles.input} type="text" placeholder="name" onChange={onName} />
          <input
            className={styles.input}
            type="text"
            placeholder="password"
            onChange={onPassword}
          />
          <Button handler={onSend}>
            <span>Login</span>
          </Button>
        </div>
      </section>
    </Layout>
  );
};
