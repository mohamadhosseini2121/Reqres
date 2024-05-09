export default interface paginated_response_model<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}
