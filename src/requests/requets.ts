import { HEADERS_JSON } from "./constants";
import { AdminLoginRequestProps, AdminRequestResponse, ProductCategoriesResponse, Response } from "./types";
import { ProductsProps } from "../types/prducts";

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
  const response = await fetch(`${API}/products-categories`);
  return await response.json();
};

export const fetchProductsByCategory = async (category: string): Promise<Response<ProductsProps[]>> => {
  const response = await fetch(`${API}/products/${category}`);
  return await response.json();
};
