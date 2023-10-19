import { useState } from 'react';
import { ProductCategories } from '../../components/ProductCategories';
import { ProductsList } from '../../components/ProductsList';
import { Layout } from '../../../components/Layout';
import { DEFAULT_CATEGORY } from '../../constants/common';
import styles from './styles.module.scss';

const currentCategory = localStorage.getItem('currentProductCategory') || DEFAULT_CATEGORY;

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>(currentCategory);

  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <div className={styles.content}>
        <ProductCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <ProductsList category={activeCategory} />
      </div>
    </Layout>
  );
};
