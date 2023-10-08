export enum ProductFields {
  _id = '_id',
  id = 'id',
  category = 'category',
  name = 'name',
  proteins = 'proteins',
  fat = 'fat',
  carbohydrates = 'carbohydrates',
  kcal = 'kcal'
}

export interface ProductsProps {
  _id: string;
  id: string;
  category: string;
  name: string;
  proteins: string;
  fat: string;
  carbohydrates: string;
  kcal: string;
}
