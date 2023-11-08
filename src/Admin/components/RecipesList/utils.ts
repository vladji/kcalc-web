import { RecipeProductsProps, RecipeProps } from '../../types/recipes';
import { ClonedRecipeProps, ProductWithTempIdProps } from './types';
import { v4 as uuidv4 } from 'uuid';

type ProductsRecipeAddTempId = (products: RecipeProductsProps[]) => ProductWithTempIdProps[];

export const productsRecipeAddTempId: ProductsRecipeAddTempId = (products) => {
  return products.map((product) => ({
    ...product,
    tempId: uuidv4(),
  }));
};

type CreateNewProduct = () => ProductWithTempIdProps;

export const createNewProduct: CreateNewProduct = () => {
  return {
    tempId: uuidv4(),
    prodId: '',
    prod: '',
    amount: '',
  };
};

type CloneRecipe = (recipe: RecipeProps) => ClonedRecipeProps;

export const cloneRecipe: CloneRecipe = (recipe) => {
  const clone: RecipeProps = structuredClone(recipe);
  clone.products = productsRecipeAddTempId(clone.products);
  return clone as ClonedRecipeProps;
};
