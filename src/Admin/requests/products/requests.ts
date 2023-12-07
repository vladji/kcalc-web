import { API, API_KEY, HEADERS_JSON } from '../constants';
import { MongoResponse, ResponseCustom } from '../types';
import { ProductsPropsWithDbId } from '../../types/products';
import { PostProductsRequest, ProductCategoriesResponse, UpdateProductsRequest } from './types';

export const fetchProductCategories =
  async (): Promise<ResponseCustom<ProductCategoriesResponse> | void> => {
    try {
      const response = await fetch(`${API}/products-categories`, {
        method: 'GET',
        headers: {
          Authorization: `${API_KEY}`,
        },
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
      headers: {
        Authorization: `${API_KEY}`,
      },
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

export const getUserProducts = async (
  token: string
): Promise<ResponseCustom<ProductsPropsWithDbId[]> | undefined> => {
  try {
    const response = await fetch(`${API}/user-products?token=${token}`, {
      method: 'GET',
    });
    return await response.json();
  } catch {
    return undefined;
  }
};

export const deleteUserProducts = async ({
  token,
  productId,
}: {
  token: string;
  productId: string;
}): Promise<ResponseCustom<MongoResponse> | undefined> => {
  try {
    const response = await fetch(`${API}/user-product?token=${token}&productId=${productId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch {
    return undefined;
  }
};
