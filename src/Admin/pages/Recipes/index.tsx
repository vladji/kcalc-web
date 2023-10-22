import { useState } from 'react';
import { Layout } from '../../../components/Layout';
import { RecipeCategories } from '../../components/RecipeCategories';
import { RecipesList } from '../../components/RecipesList';
import { DEFAULT_RECIPE_CATEGORY } from '../../constants/common';
import styles from './styles.module.scss';

const currentCategory = localStorage.getItem('currentRecipeCategory') || DEFAULT_RECIPE_CATEGORY;

export const Recipes = () => {
  const [category, setCategory] = useState(currentCategory);

  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <div className={styles.content}>
        <RecipeCategories activeCategory={category} setActiveCategory={setCategory} />
        <RecipesList category={category} />
      </div>
    </Layout>
  );
};
