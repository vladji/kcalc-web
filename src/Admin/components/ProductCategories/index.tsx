import { Dispatch, FC, SetStateAction } from 'react';
import { useFetchProductCategories } from '../../requests/useFetchProductCategories';
import { CategoriesList } from '../CategoriesList';

interface AdminProductCategoriesProps {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
}

export const ProductCategories: FC<AdminProductCategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const { categories, isFetched } = useFetchProductCategories();

  const onCategoryClick = (category: string) => {
    localStorage.setItem('currentProductCategory', category);
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
