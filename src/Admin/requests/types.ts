export enum ResponseStatus {
  successUpdate = 204,
}

export enum QueryKeys {
  productCategories = 'productCategories',
  recipesCategories = 'recipesCategories',
}

export interface ResponseCustom<T> {
  data?: T;
  error?: string;
}
