import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoadingAni } from '../common/animation/Ani';

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
      console.log(Date() + ' query 성공', data);
      return data;
    },
    refetchInterval: 500000, // 5초마다 자동 refetch
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  });
  return { data, isLoading, error };
};
type QueryProps<T> = {
  uri?: string;
  onSuccess: (data: T) => JSX.Element;
  onLoading?: () => JSX.Element;
  onFailed?: () => JSX.Element;
};
export const QueryRender = <T,>({
  uri = 'https://jsonplaceholder.typicode.com/users/1', // 샘플 통신
  onSuccess,
  onLoading = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingAni />
    </div>
  ),
  onFailed = () => <>통신 error</>,
}: QueryProps<T>) => {
  const { data, isLoading, error } = useGetQuery(uri);
  if (isLoading) return onLoading();
  if (error) return onFailed();
  return onSuccess(data!);
};
