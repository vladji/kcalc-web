import { HEADERS_JSON } from "./constants";
import {
  AdminLoginRequestProps,
  AdminRequestResponse,
  PostProductsRequest,
  ProductCategoriesResponse,
  Response,
  UpdateProductsRequest
} from "./types";
import { ProductsPropsWithDbId } from "../types/products";

const API = process.env.REACT_APP_API_ENDPOINT;

export const adminLogin = async (data: AdminLoginRequestProps): Promise<Response<string>> => {
  const response = await fetch(`${API}/admin-login`, {
    method: "POST",
    headers: HEADERS_JSON,
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const adminRequest = async (token: string): Promise<Response<AdminRequestResponse>> => {
  const response = await fetch(`${API}/admin?token=${token}`);
  return await response.json();
};

export const fetchProductCategories = async (): Promise<Response<ProductCategoriesResponse>> => {
  const response = await fetch(`${API}/products-categories`, {
    method: "GET"
  });
  return await response.json();
};

export const fetchProductsByCategory = async (category: string): Promise<Response<ProductsPropsWithDbId[]>> => {
  const response = await fetch(`${API}/products-category?category=${category}`, {
    method: "GET"
  });
  return await response.json();
};

export const updateProducts = async ({ token, products }: UpdateProductsRequest): Promise<unknown> => {
  const response = await fetch(`${API}/products-update?token=${token}`, {
    method: "PATCH",
    headers: HEADERS_JSON,
    body: JSON.stringify(products)
  });
  return await response.status;
};

export const postProducts = async ({ token, products }: PostProductsRequest): Promise<unknown> => {
  const response = await fetch(`${API}/products?token=${token}`, {
    method: "POST",
    headers: HEADERS_JSON,
    body: JSON.stringify(products)
  });
  return await response.status;
};

export const deleteProduct = async ({ token, id }: { token: string, id: string }): Promise<unknown> => {
  const response = await fetch(`${API}/product-delete?token=${token}&id=${id}`, {
    method: "DELETE",
  });
  return await response.status;
};
