export interface Paginated<T> {
  links: {
    next: string;
    previous: string;
  };
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  results: T[];
}
