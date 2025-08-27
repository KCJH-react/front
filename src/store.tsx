import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/sessionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// 타입 추론을 위한 헬퍼 타입
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
