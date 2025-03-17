export interface ApiResponse<T> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
}
