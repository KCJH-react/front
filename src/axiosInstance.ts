// src/axiosInstance.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8020", // 백엔드 베이스 URL
  withCredentials: true,
});

// 요청 인터셉터: 액세스 토큰 자동 주입
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 필요 시 Redux로 교체 가능
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 공통 에러 처리(필요 시 확장)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn("⚠️ 인증 만료: 다시 로그인 필요");
      // TODO: 로그아웃/리다이렉트 처리 들어가도 됨
    }
    return Promise.reject(err);
  }
);

export default api;
