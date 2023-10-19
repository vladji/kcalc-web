import { ResponseCustom } from '../types';
import { RecipesCategoriesResponse } from './types';

const API = process.env.REACT_APP_API_ENDPOINT;

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
