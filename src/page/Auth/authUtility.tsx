import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/sessionSlice';
import { setToken } from '../../redux/tokenSlice';
import type { RootState } from '../../store';

export const useAuth = () => {
  const userId = useSelector((state: RootState) => state.user.value);
  const accessToken = useSelector((state: RootState) => state.token.value);
  return { userId, accessToken };
};
interface useAuthSaveProps {
  userId: number;
  accessToken: string;
}
export const useAuthSave = () => {
  const dispatch = useDispatch();

  return ({ userId, accessToken }: useAuthSaveProps) => {
    dispatch(signin(userId));
    dispatch(setToken(accessToken));
    console.log('회원정보 저장');
  };
};
