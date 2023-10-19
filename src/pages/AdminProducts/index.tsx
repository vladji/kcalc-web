import { useState } from 'react';
import { AdminProductCategories } from '../../components/AdminProductCategories';
import { AdminProductsList } from '../../components/AdminProductsList';
import { DEFAULT_CATEGORY } from '../Admin/constants';
import styles from './styles.module.scss';
import { Layout } from '../../components/Layout';

const currentCategory = localStorage.getItem('currentProductCategory') || DEFAULT_CATEGORY;

export const AdminProducts = () => {
  const [activeCategory, setActiveCategory] = useState<string>(currentCategory);

  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <div className={styles.content}>
        <AdminProductCategories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <AdminProductsList category={activeCategory} />
      </div>
    </Layout>
  );
};
