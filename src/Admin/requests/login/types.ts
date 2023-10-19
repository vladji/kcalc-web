export interface LoginRequestProps {
  name: string;
  pass: string;
}

export interface AdminRequestResponse {
  id: string;
  username: string;
  iat: number;
  exp: number;
}
