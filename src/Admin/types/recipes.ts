export enum RecipeCategoriesEnum {
  snack = 'snack',
  breakfast = 'breakfast',
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

export interface RecipeProps {
  _id?: string;
  id: string;
  category: RecipeCategoriesEnum[];
  name: string;
  image: string;
  imageBase64: string;
  products: [
    {
      _id: string;
      prodId?: string;
      prod: string;
      amount: string;
    }
  ];
  recipe: string[];
}
