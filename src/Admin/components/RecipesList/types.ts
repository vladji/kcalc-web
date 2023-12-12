import { RecipeCategoriesEnum, RecipeProductsProps } from '../../types/recipes';

export interface ProductWithTempIdProps extends RecipeProductsProps {
  tempId: string;
}

export interface ClonedRecipeProps {
  _id: string;
  id: string;
  key: number;
  category: RecipeCategoriesEnum[];
  name: string;
  image: string;
  imageBase64?: string;
  products: ProductWithTempIdProps[];
  recipe: string[];
}
