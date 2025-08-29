import axios from 'axios';
import type { Response } from '../../common/type';
import type { LoginData, SigninRequest } from './authType';

export const login = async (data: SigninRequest) => {
  try {
    const response: Response<LoginData> = await axios.post(
      'http://localhost:8020/api/v1/user/signin',
      data,
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const errorData = e.response.data;
      console.log(
        errorData.errorResponsev2.code +
          ': ' +
          errorData.errorResponsev2.message,
      );
      return errorData;
    }
  }
};
