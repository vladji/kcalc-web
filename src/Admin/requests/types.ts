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

export interface MongoResponse {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount?: number;
  upsertedId?: any;
}
