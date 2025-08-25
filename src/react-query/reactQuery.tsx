import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { LoadingAni } from '../common/animation/Ani';
import { useEffect, useState } from 'react';

type UserData = {
  id: number;
  name: string;
};

const useGetQuery = (uri: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [uri],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8020${uri}`);
      return response.data;
    },
    select: (data) => {
      console.log(Date() + ' query 성공', data);
      return data.data;
    },
    refetchInterval: 100000 * 60 * 60, // 1시간마다 자동 refetch
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
  uri,
  // = 'https://jsonplaceholder.typicode.com/users/1'
  onSuccess,
  onLoading = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingAni />
    </div>
  ),
  onFailed = () => <>통신 error</>,
}: QueryProps<T>) => {
  const { data, isLoading, error } = useGetQuery(uri!);
  if (isLoading) return onLoading();
  if (error) return onFailed();
  return onSuccess(data!);
};

interface AxiosProps {
  type: 'get' | 'post' | 'put' | 'delete';
  uri: string;
  props?: any;
}

export const Axios = ({ type, uri, props }: AxiosProps) => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        switch (type) {
          case 'get':
            response = await axios.get(`http://localhost:8020${uri}`, props);
            break;
          case 'delete':
            response = await axios.delete(`http://localhost:8020${uri}`, props);
            break;
          case 'post':
            response = await axios.post(`http://localhost:8020${uri}`, props);
            break;
          case 'put':
            response = await axios.put(`http://localhost:8020${uri}`, props);
            break;
        }
        setData(response!.data);
        setIsLoading(false);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.errorResponsev2.message);
          setIsLoading(false);
        }
        return [data, isLoading, error];
      }
    };
    fetchData();
  }, [type, uri, props]);
  return { data, isLoading, error };
};
interface AxiosRenderProps {
  type: 'get' | 'post' | 'put' | 'delete';
  uri: string;
  props?: any;
  onSuccess: (data: string) => JSX.Element;
  onLoading?: () => JSX.Element;
  onError?: (data: string) => JSX.Element;
}
export const AxiosRender = ({
  uri,
  type,
  props,
  onSuccess,
  onLoading = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingAni />
    </div>
  ),
  onError = (error: string) => <>{error} error</>,
}: AxiosRenderProps) => {
  const { data, isLoading, error } = Axios({ type, uri, props });

  if (isLoading) return onLoading();
  if (error) return onError(error);
  return onSuccess(data!);
};
