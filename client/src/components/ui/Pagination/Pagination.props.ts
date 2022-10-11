export interface PaginationProps {
  page: number;
  lastPage: number;
  next: () => void;
  back: () => void;
  className?: string;
}
