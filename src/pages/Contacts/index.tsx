import { Layout } from '../../components/Layout';
import { Section } from '../../components/UI/Section';
import styles from './styles.module.scss';

export const Contacts = () => {
  return (
    <Layout>
      <Section>
        <h1>Contact Us</h1>
        <a className={styles.link} href="mailto:elyabaiduan@gmail.com">elyabaiduan@gmail.com</a>
      </Section>
    </Layout>
  );
};
