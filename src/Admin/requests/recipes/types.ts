import { RecipeCategoriesEnum, RecipeProps } from '../../types/recipes';

export interface RecipesCategoriesResponse {
  categories: RecipeCategoriesEnum[];
}

export interface UploadImageRequest {
  formData: FormData;
  deleteFileName?: string;
}

export interface ReplaceRecipeImageNameRequest {
  recipeId: string;
  newImageName: string;
}

export interface PostRecipeRequest {
  recipe: RecipeProps;
  token: string;
  recipeId?: string;
}
