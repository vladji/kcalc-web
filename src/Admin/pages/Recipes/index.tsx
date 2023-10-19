import { useState } from 'react';
import { Layout } from '../../../components/Layout';
import { RecipeCategories } from '../../components/RecipeCategories';

export const Recipes = () => {
  const [category, setCategory] = useState('');

  return (
    <Layout headerText="Admin" linkTo="/admin" isAdmin>
      <RecipeCategories />
    </Layout>
  );
};
