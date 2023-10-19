export enum ResponseStatus {
  successUpdate = 204,
}

export enum QueryKeys {
  productCategories = 'productCategories',
}

export interface ResponseCustom<T> {
  data?: T;
  error?: string;
}
