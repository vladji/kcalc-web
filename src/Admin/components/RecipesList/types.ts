import { RecipeCategoriesEnum, RecipeProductsProps } from '../../types/recipes';

export interface ProductWithTempIdProps extends RecipeProductsProps {
  tempId: string;
}

export interface ClonedRecipeProps {
  _id: string;
  id: string;
  category: RecipeCategoriesEnum[];
  sortOrder: Record<RecipeCategoriesEnum, number>;
  name: string;
  image: string;
  imageBase64?: string;
  products: ProductWithTempIdProps[];
  recipe: string[];
}
