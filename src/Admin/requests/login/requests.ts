import { ResponseCustom } from '../types';
import { API, HEADERS_JSON } from '../constants';
import { AdminRequestResponse, LoginRequestProps } from './types';

export const adminLogin = async (
  data: LoginRequestProps
): Promise<ResponseCustom<string> | void> => {
  try {
    const response = await fetch(`${API}/admin-login`, {
      method: 'POST',
      headers: HEADERS_JSON,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch {
    alert('Server error');
  }
};

export const adminRequest = async (
  token: string
): Promise<ResponseCustom<AdminRequestResponse> | void> => {
  try {
    const response = await fetch(`${API}/admin?token=${token}`);
    return await response.json();
  } catch {
    alert('Server error');
  }
};
