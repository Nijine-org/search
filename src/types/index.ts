// type CustomResponse<D> = {
//   state: boolean;
//   message: string;
//   statusCode: number;
//   data?: D;
// };
interface TableURLParams {
  page: number;
  per_page: number;
  search: string | number;
}
type TablePaginationParams = {
  [key: string]: number;
};
type TableMetaData = {
  page: number;
  per_page: number;
  search: string | number;
  total: number;
  current_page: number;
  last_page: number;
};
type SuccessResponse<Response> = {
  state: true;
  statusCode: number;
  data: Response;
  message: string;
  meta?: TableMetaData;
  pagination?: TablePaginationParams;
  selected_employee_ids?: string[];
};

type ErrorResponse = {
  state: false;
  statusCode: number;
  message: string;
};

type CustomResponse<Response> = SuccessResponse<Response> | ErrorResponse;
export type {
  CustomResponse,
  TablePaginationParams,
  TableMetaData,
  TableURLParams,
};
