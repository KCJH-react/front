import axios, { Axios } from 'axios';

const login = async () => {
  try {
    const response = await axios.post('local');
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      if (e.response.status >= 500) return ErrorType.CLIENTERROR;
      else if (e.response.status >= 400) return ErrorType.SERVERERROR;
    }
    return ErrorType.UNKNOWN;
  }
};
export const ErrorType = {
  CLIENTERROR: '400',
  SERVERERROR: '500',
  UNKNOWN: '0',
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];
