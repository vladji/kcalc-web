export interface RecipesCategoriesResponse {
  categories: string[];
}

export interface RecipeProps {
  _id: string;
  id: string;
  category: string[];
  name: string;
  image: string;
  imageBase64: string;
  products: [
    {
      prod: string;
      amount: string;
    }
  ];
  recipe: string[];
}

export interface UploadImageRequest {
  formData: FormData;
  deleteFileName?: string;
}

export interface ReplaceRecipeImageNameRequest {
  recipeId: string;
  newImageName: string;
}
