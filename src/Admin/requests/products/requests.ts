import { API, HEADERS_JSON } from '../constants';
import { ResponseCustom } from '../types';
import { ProductsPropsWithDbId } from '../../types/products';
import { PostProductsRequest, ProductCategoriesResponse, UpdateProductsRequest } from './types';

export const fetchProductCategories =
  async (): Promise<ResponseCustom<ProductCategoriesResponse> | void> => {
    try {
      const response = await fetch(`${API}/products-categories`, {
        method: 'GET',
      });
      return await response.json();
    } catch {
      alert('Server error');
    }
  };

export const fetchProductsByCategory = async (
  category: string
): Promise<ResponseCustom<ProductsPropsWithDbId[]> | void> => {
  try {
    const response = await fetch(`${API}/products-category?category=${category}`, {
      method: 'GET',
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const updateProducts = async ({
  token,
  products,
}: UpdateProductsRequest): Promise<Response | undefined> => {
  try {
    return await fetch(`${API}/products-update?token=${token}`, {
      method: 'PATCH',
      headers: HEADERS_JSON,
      body: JSON.stringify(products),
    });
  } catch {
    return undefined;
  }
};

export const postProducts = async ({
  token,
  products,
}: PostProductsRequest): Promise<Response | undefined> => {
  try {
    return await fetch(`${API}/products?token=${token}`, {
      method: 'POST',
      headers: HEADERS_JSON,
      body: JSON.stringify(products),
    });
  } catch {
    return undefined;
  }
};

export const deleteProduct = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<Response | undefined> => {
  try {
    return await fetch(`${API}/product-delete?token=${token}&id=${id}`, {
      method: 'DELETE',
    });
  } catch {
    return undefined;
  }
};
