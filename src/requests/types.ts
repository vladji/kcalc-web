export interface Response<T> {
  data?: T;
  error?: string;
}

export interface AdminLoginRequestProps {
  name: string;
  pass: string;
}
