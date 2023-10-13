import { ProductProps, ProductsPropsWithDbId } from "../types/products";

export enum ResponseStatus {
  successUpdate = 204,
}

export enum QueryKeys {
  productCategories = "productCategories",
}

export interface ResponseCustom<T> {
  data?: T;
  error?: string;
}

export interface AdminLoginRequestProps {
  name: string;
  pass: string;
}

export interface AdminRequestResponse {
  id: string,
  username: string,
  iat: number,
  exp: number,
}

export interface ProductCategoriesResponse {
  categories: string[];
}

export interface UpdateProductsRequest {
  token: string;
  products: ProductsPropsWithDbId[];
}

export interface PostProductsRequest {
  token: string;
  products: ProductProps[];
}
