import { RecipeCategoriesEnum, RecipePostProps, RecipeProps } from '../../types/recipes';

export interface RecipesCategoriesResponse {
  categories: RecipeCategoriesEnum[];
}

export interface UploadImageRequest {
  formData: FormData;
  token: string;
}

export interface ReplaceRecipeImageNameRequest {
  recipeId: string;
  newImageName: string;
}

export interface PatchRecipeRequest {
  recipe: RecipeProps;
  token: string;
  recipeId: string;
}

export interface PostRecipeProps {
  recipe: RecipePostProps;
  token: string;
}

export interface DeleteRecipeRequest {
  recipeId: string;
  token: string;
}
