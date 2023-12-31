export enum RecipeCategoriesEnum {
  breakfast = 'breakfast',
  bread = 'bread',
  salads = 'salads',
  soup = 'soup',
  lunch = 'lunch',
  dessert = 'dessert',
  drinks = 'drinks',
}

export enum RecipeFields {
  _id = '_id',
  id = 'id',
  category = 'category',
  name = 'name',
  image = 'image',
  imageBase64 = 'imageBase64',
  products = 'products',
  recipe = 'recipe',
}

export enum RecipeProductsFields {
  _id = '_id',
  prodId = 'prodId',
  prod = 'prod',
  amount = 'amount',
}

export interface RecipeProductsProps {
  _id?: string;
  prodId: string;
  prod: string;
  amount: string;
}

export interface RecipeProps {
  _id: string;
  id: string;
  category: RecipeCategoriesEnum[];
  sortOrder: Record<RecipeCategoriesEnum, number>;
  name: string;
  image: string;
  products: RecipeProductsProps[];
  recipe: string[];
}

export type RecipePostProps = Omit<RecipeProps, '_id'>;
