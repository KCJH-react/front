import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ReactNode } from 'react';

const useGetQuery = (uri: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [uri],
    queryFn: async () => {
      const response = await axios.get(uri);
      return response.data;
    },

    select: (data) => {
      console.log(data);
      return data;
    },
    refetchOnWindowFocus: 'always',
    refetchInterval: 10000,
    staleTime: 5000,
  });
  return { data, isLoading, error };
};

type GetQueryRendererProps = {
  uri: string;
  onSuccess: (data: any) => ReactNode;
  onLoading?: () => ReactNode;
  onFalied?: (error?: any) => ReactNode;
};

export const GetQueryRenderer = ({
  uri,
  onSuccess,
  onLoading = () => <div>로딩중...</div>,
  onFalied = () => <div>실패</div>,
}: GetQueryRendererProps) => {
  const { data, isLoading, error } = useGetQuery(uri);
  if (isLoading) return <>{onLoading()}</>;
  if (error) return <>{onFalied()}</>;
  return onSuccess(data);
};
