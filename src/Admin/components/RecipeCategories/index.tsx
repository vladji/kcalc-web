import { Dispatch, FC, SetStateAction } from 'react';
import { useFetchRecipesCategories } from '../../requests/recipes/useFetchRecipesCategories';
import { CategoriesList } from '../CategoriesList';

interface RecipeCategoriesProps {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
}

export const RecipeCategories: FC<RecipeCategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const { categories, isFetched } = useFetchRecipesCategories();

  const onCategoryClick = (category: string) => {
    localStorage.setItem('currentRecipeCategory', category);
    setActiveCategory(category);
  };

  return (
    <CategoriesList
      clickHandler={onCategoryClick}
      activeCategory={activeCategory}
      isLoading={!isFetched}
      categories={categories}
    />
  );
};
