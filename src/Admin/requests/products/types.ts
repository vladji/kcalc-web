import { ProductProps, ProductsPropsWithDbId } from '../../types/products';

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
