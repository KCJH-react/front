import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UserData = {
  id: number;
  name: string;
};

const useGetQuery = (uri: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [uri],
    queryFn: async () => {
      const response = await axios.get(`${uri}`);
      return response.data;
    },
    select: (data) => {
      console.log('성공', data);
      return data;
    },
    refetchInterval: 500000, // 5초마다 자동 refetch
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  });
  return { data, isLoading, error };
};
type componentProps<T> = {
  onSuccess: (data: T) => JSX.Element;
  onLoading?: () => JSX.Element;
  onFailed?: () => JSX.Element;
};
const Queryview = <T,>({
  onSuccess,
  onLoading = () => <>로딩중...</>,
  onFailed = () => <>통신 error</>,
}: componentProps<T>) => {
  const { data, isLoading, error } = useGetQuery(
    'https://jsonplaceholder.typicode.com/users/1',
  );
  if (isLoading) return onLoading();
  if (error) return onFailed();
  return onSuccess(data!);
};
