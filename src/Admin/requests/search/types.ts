export interface SearchRequest {
  query: string;
  page: number;
}

export interface SearchMeta {
  alerts: any[];
  engine: {
    name: string;
    type: string;
  };
  page: {
    current: number;
    total_pages: number;
    total_results: number;
  };
  precision: number;
  request_id: string;
  warnings: any[];
}

export interface SearchResults {
  id: { raw: string };
  name: { raw: string; snippet: string };
  category: { raw: string };
  proteins: { raw: string };
  fat: { raw: string };
  carbohydrates: { raw: string };
  kcal: { raw: string };
  _meta: {
    id: string;
    engine: string;
    score: number;
  };
}

export interface SearchResponse {
  meta: SearchMeta;
  results: SearchResults[];
}
