import { useRef } from 'react';
import { debounce } from '../utils/debounce';

export const useDebounce = (
  func: (...args: any) => void,
  delay: number
): ((...args: any) => void) => {
  return useRef(debounce(func, delay)).current;
};
