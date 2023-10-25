import { Dispatch, FC, SetStateAction } from 'react';
import { useFetchRecipesCategories } from '../../requests/recipes/useFetchRecipesCategories';
import { CategoriesList } from '../CategoriesList';
import { RecipeCategoriesEnum } from '../../types/recipes';

interface RecipeCategoriesProps {
  activeCategory: RecipeCategoriesEnum;
  setActiveCategory: Dispatch<SetStateAction<RecipeCategoriesEnum>>;
}

export const RecipeCategories: FC<RecipeCategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const { categories, isFetched } = useFetchRecipesCategories();

  const onCategoryClick = (category: RecipeCategoriesEnum) => {
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
