import axios from 'axios';

export interface ErrorResponsev2 {
  code: ErrorType;
  message: string;
}
export interface Response<T> {
  data: T | null;
  errorResponsev2: ErrorResponsev2 | null;
}
// 타입만 정의
export type ErrorType =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'DATABASE_ERROR'
  | 'BUSINESS_LOGIC_ERROR'
  | 'EXTERNAL_API_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';

// 제네릭 로그인/요청 함수
export const post = async <Req, Res>(
  url: string,
  data: Req,
): Promise<Response<Res>> => {
  try {
    const response = await axios.post<Response<Res>>(
      `http://localhost:8020${url}`,
      data,
    );
    return response.data; // 성공 시 데이터 반환
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      const errorData = e.response.data as Response<Res>;
      return errorData; // 에러 데이터 반환
    }
    throw e; // Axios가 아닌 에러는 그대로 throw
  }
};

// export const get = async (uri, data) => {
//   try {
//     const response = await axios.get(`http://localhost:8020/api/${uri}`, data);
//     return response.data;
//   } catch (e) {
//     if (axios.isAxiosError(e) && e.response) {
//       const errorData = e.response.data;
//       console.log(errorData.message);
//     }
//   }
// };
