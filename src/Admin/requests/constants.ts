export const API = process.env.REACT_APP_API_ENDPOINT;
export const IMAGE_API = process.env.REACT_APP_IMAGE_API_ENDPOINT;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const HEADERS_JSON = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const SHORT_STALE_TIME = 1000 * 60 * 5; // 5 min
export const LONG_STALE_TIME = 1000 * 60 * 60; // 1 hour
