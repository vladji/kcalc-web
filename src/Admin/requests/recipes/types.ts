export interface RecipesCategoriesResponse {
  categories: string[];
}

export interface RecipeProps {
  _id: string;
  id: string;
  category: string[];
  name: string;
  imageBase64: string;
  products: [
    {
      prod: string;
      amount: string;
    }
  ];
  recipe: string[];
}
