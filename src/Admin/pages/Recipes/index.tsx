import { useState } from 'react';
import { Layout } from '../../../components/Layout';
import { RecipeCategories } from '../../components/RecipeCategories';
import { DEFAULT_RECIPE_CATEGORY } from '../../constants/common';

const currentCategory = localStorage.getItem('currentRecipeCategory') || DEFAULT_RECIPE_CATEGORY;

export const Recipes = () => {
  const [category, setCategory] = useState(currentCategory);

  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <RecipeCategories activeCategory={category} setActiveCategory={setCategory} />
    </Layout>
  );
};
