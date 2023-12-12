import { MongoResponse, ResponseCustom } from '../types';
import {
  DeleteRecipeRequest,
  PatchRecipeRequest,
  PostRecipeProps,
  RecipeKeyRequest,
  RecipesCategoriesResponse,
  ReplaceRecipeImageNameRequest,
  UploadImageRequest,
} from './types';
import { API, API_KEY, HEADERS_JSON } from '../constants';
import { RecipeCategoriesEnum, RecipeProps } from '../../types/recipes';

export const getRecipesCategories =
  async (): Promise<ResponseCustom<RecipesCategoriesResponse> | void> => {
    try {
      const response = await fetch(`${API}/recipes-categories`, {
        method: 'GET',
        headers: {
          Authorization: `${API_KEY}`,
        },
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
      headers: {
        Authorization: `${API_KEY}`,
      },
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const uploadImage = async ({
  formData,
  token,
}: UploadImageRequest): Promise<ResponseCustom<string> | void> => {
  try {
    const response = await fetch(`${API}/upload-image?token=${token}`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const cleanImages = async (token: string): Promise<ResponseCustom<string> | void> => {
  try {
    const response = await fetch(`${API}/clean-images?token=${token}`, {
      method: 'DELETE',
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
        method: 'PATCH',
        headers: {
          Authorization: `${API_KEY}`,
        },
      }
    );
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const patchRecipeKey = async ({
  token,
  data,
}: RecipeKeyRequest): Promise<ResponseCustom<MongoResponse[]> | void> => {
  try {
    const response = await fetch(`${API}/patch-recipe-key?token=${token}`, {
      headers: HEADERS_JSON,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const putRecipe = async ({
  recipe,
  token,
  recipeId,
}: PatchRecipeRequest): Promise<ResponseCustom<MongoResponse> | void> => {
  try {
    const response = await fetch(`${API}/put-recipe?id=${recipeId}&token=${token}`, {
      headers: HEADERS_JSON,
      method: 'PUT',
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

export const deleteRecipe = async ({
  recipeId,
  token,
}: DeleteRecipeRequest): Promise<ResponseCustom<MongoResponse> | void> => {
  try {
    const response = await fetch(`${API}/delete-recipe?id=${recipeId}&token=${token}`, {
      headers: HEADERS_JSON,
      method: 'DELETE',
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};
