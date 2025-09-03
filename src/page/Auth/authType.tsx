export interface LoginData {
  id: number;
  username: string;
  email: string;
  user_credential: null;
}
export interface SigninRequest {
  email: string;
  password: string;
}
export type Challenge =
  | '미용'
  | '봉사'
  | '여행'
  | '취업'
  | '운동'
  | '학습'
  | '대중문화'
  | '금융'
  | '인간관계';
export type Sex = '남자' | '여자';
export interface emailRequest {
  email: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  sex: Sex;
  birthday: string;
  goal: string;
  //preferredChallenge: Challenge[];
  imgUrl: string;
}
