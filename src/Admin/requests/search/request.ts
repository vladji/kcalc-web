import { API, API_KEY } from '../constants';
import { SearchRequest, SearchResponse } from './types';
import { ResponseCustom } from '../types';

export const search = async ({
  query,
  page,
}: SearchRequest): Promise<ResponseCustom<SearchResponse> | undefined> => {
  try {
    const response = await fetch(`${API}/search-products?query=${query}&page=${page}&size=50`, {
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
