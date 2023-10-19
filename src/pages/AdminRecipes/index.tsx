import { Layout } from '../../components/Layout';
import styles from './styles.module.scss';

export const AdminRecipes = () => {
  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <div className={styles.content}>RECIPES</div>
    </Layout>
  );
};
