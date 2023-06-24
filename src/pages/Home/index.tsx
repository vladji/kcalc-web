import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Section } from '../../components/UI/Section';
import styles from './styles.module.scss';

export const Home = () => {
  return (
    <Layout>
      <Section>
        <Link className={styles.link} to="/privacy-policy">
          Privacy Policy
        </Link>
        <Link className={styles.link} to="/contacts">
          Contact Us
        </Link>
      </Section>
    </Layout>
  );
};
