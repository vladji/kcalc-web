import { MongoResponse, ResponseCustom } from '../types';
import {
  PostRecipeRequest,
  RecipesCategoriesResponse,
  ReplaceRecipeImageNameRequest,
  UploadImageRequest,
} from './types';
import { API, HEADERS_JSON, IMAGE_API, IMAGE_API_KEY } from '../constants';
import { RecipeCategoriesEnum, RecipeProps } from '../../types/recipes';

export const getRecipesCategories =
  async (): Promise<ResponseCustom<RecipesCategoriesResponse> | void> => {
    try {
      const response = await fetch(`${API}/recipes-categories`, {
        method: 'GET',
      });
      return await response.json();
    } catch {
      alert('Server error');
    }
  };

export const getRecipesByCategory = async (
  category: RecipeCategoriesEnum
): Promise<ResponseCustom<RecipeProps[]> | void> => {
  try {
    const response = await fetch(`${API}/recipes/${category}`, {
      method: 'GET',
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const uploadImage = async ({
  formData,
  deleteFileName = '',
}: UploadImageRequest): Promise<ResponseCustom<string> | void> => {
  try {
    const response = await fetch(`${IMAGE_API}/upload-image?delete=${deleteFileName}`, {
      headers: {
        Authorization: `${IMAGE_API_KEY}`,
      },
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const replaceRecipeImageName = async ({
  recipeId,
  newImageName,
}: ReplaceRecipeImageNameRequest): Promise<ResponseCustom<string> | void> => {
  try {
    const response = await fetch(
      `${API}/recipe-replace-image?id=${recipeId}&name=${newImageName}`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const postRecipe = async ({
  recipe,
  token,
  recipeId,
}: PostRecipeRequest): Promise<ResponseCustom<MongoResponse> | void> => {
  try {
    const response = await fetch(`${API}/post-recipe?id=${recipeId}&token=${token}`, {
      headers: HEADERS_JSON,
      method: 'POST',
      body: JSON.stringify(recipe),
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};
