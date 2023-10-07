export interface Response<T> {
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
