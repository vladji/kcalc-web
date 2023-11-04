import { MongoResponse, ResponseCustom } from '../types';
import {
  PatchRecipeRequest,
  PostRecipeProps,
  RecipesCategoriesResponse,
  ReplaceRecipeImageNameRequest,
  UploadImageRequest,
} from './types';
import { API, API_KEY, HEADERS_JSON, IMAGE_API } from '../constants';
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
        Authorization: `${API_KEY}`,
      },
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const fetchImage = async ({ filename }: { filename: string }): Promise<string[] | void> => {
  try {
    const response = await fetch(`${IMAGE_API}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([filename]),
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

export const pathRecipe = async ({
  recipe,
  token,
  recipeId,
}: PatchRecipeRequest): Promise<ResponseCustom<MongoResponse> | void> => {
  try {
    const response = await fetch(`${API}/patch-recipe?id=${recipeId}&token=${token}`, {
      headers: HEADERS_JSON,
      method: 'PATCH',
      body: JSON.stringify(recipe),
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const postRecipe = async ({
  recipe,
  token,
}: PostRecipeProps): Promise<ResponseCustom<MongoResponse> | void> => {
  try {
    const response = await fetch(`${API}/insert-recipe?token=${token}`, {
      headers: HEADERS_JSON,
      method: 'POST',
      body: JSON.stringify(recipe),
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};
