export interface RecipesCategoriesResponse {
  categories: string[];
}

export interface UploadImageRequest {
  formData: FormData;
  deleteFileName?: string;
}

export interface ReplaceRecipeImageNameRequest {
  recipeId: string;
  newImageName: string;
}
