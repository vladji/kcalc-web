import { RecipeCategoriesEnum } from '../types/recipes';

export const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_ENDPOINT;
export const RECIPES_IMG_PATH = process.env.REACT_APP_RECIPES_IMG_PATH;

export const DEFAULT_PRODUCT_CATEGORY = 'fruits';
export const DEFAULT_RECIPE_CATEGORY = RecipeCategoriesEnum.breakfast;
export const IMAGE_BASE64_PREFIX = 'data:image/jpeg;base64,';

export const BLACK_COLOR = '#343434';
export const LIGHT_COLOR = '#fff';
