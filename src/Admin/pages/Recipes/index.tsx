import { Layout } from '../../../components/Layout';
import styles from './styles.module.scss';

export const Recipes = () => {
  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <div className={styles.content}>RECIPES</div>
    </Layout>
  );
};
