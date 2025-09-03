import { useQuery } from '@tanstack/react-query';
import axios, { Axios, AxiosError, type AxiosResponse } from 'axios';
import { LoadingAni } from '../common/animation/Ani';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/tokenSlice';
import { useAuth } from '../page/Auth/authUtility';

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
  props?: T;
  onSuccess: (data: T) => JSX.Element;
  onLoading?: () => JSX.Element;
  onFailed?: () => JSX.Element;
};
export const QueryRender = <T,>({
  uri,
  props,
  onSuccess,
  onLoading = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingAni />
    </div>
  ),
  onFailed = () => <>통신 error</>,
}: QueryProps<T>) => {
  if (props) {
  }
  const { data, isLoading, error } = useGetQuery(uri!);
  if (isLoading) return onLoading();
  if (error) return onFailed();
  return onSuccess(data!);
};

interface AxiosProps {
  type: 'get' | 'post' | 'put' | 'delete';
  uri: string;
  props?: any;
  accessToken?: string;
}
export const useAxios = ({ type, uri, props }: AxiosProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      console.log('accessToken: ' + accessToken);
      setIsLoading(true);
      try {
        let response;
        const config = {
          ...props,
          withCredentials: true,
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        };
        const config2 = {
          withCredentials: true,
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        };
        switch (type) {
          case 'get':
            response = await axios.get(`http://localhost:8020${uri}`, config);
            break;
          case 'delete':
            response = await axios.delete(
              `http://localhost:8020${uri}`,
              config,
            );
            break;
          case 'post':
            response = await axios.post(
              `http://localhost:8020${uri}`,
              props,
              config2,
            );
            break;
          case 'put':
            response = await axios.put(
              `http://localhost:8020${uri}`,
              props,
              config2,
            );
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
interface AxiosRenderProps<T> {
  type: 'get' | 'post' | 'put' | 'delete';
  uri: string;
  props?: any;
  onSuccess: (data: T) => JSX.Element;
  onLoading?: () => JSX.Element;
  onError?: (data: string) => JSX.Element;
}
export const AxiosRender = <T,>({
  uri,
  type,
  props,
  onSuccess,
  onLoading = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingAni />
    </div>
  ),
  onError = (errorMessage: string) => <>{errorMessage} error</>,
}: AxiosRenderProps<T>) => {
  const { data, isLoading, error } = useAxios({ type, uri, props });

  if (isLoading) return onLoading();
  if (error) {
    alert(error);
    return onError(error);
  }

  if (data === null) return;
  return onSuccess(data!);
};

export const fetchData = async ({
  type,
  uri,
  props,
  accessToken,
}: AxiosProps): Promise<{ data: AxiosResponse } | { data: null }> => {
  try {
    let response;
    const config = {
      ...props,
      withCredentials: true,
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
    const config2 = {
      withCredentials: true,
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
    switch (type) {
      case 'get':
        response = await axios.get(`http://localhost:8020${uri}`, config);
        break;
      case 'delete':
        response = await axios.delete(`http://localhost:8020${uri}`, config);
        break;
      case 'post':
        response = await axios.post(
          `http://localhost:8020${uri}`,
          props,
          config2,
        );
        break;
      case 'put':
        response = await axios.put(
          `http://localhost:8020${uri}`,
          props,
          config2,
        );
        break;
    }
    console.log(response);
    return { data: response };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { data: e.response ? e.response : null };
    }
    return { data: null };
  }
};
