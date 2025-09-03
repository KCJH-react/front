import Button from '../../common/component/button';
import { ScrollFadeIn } from '../../common/animation/Ani';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/sessionSlice';
import { fetchData } from '../../react-query/reactQuery';
import { setToken } from '../../redux/tokenSlice';
import { useAuth, useAuthSave } from './authUtility';

const Signin = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <ScrollFadeIn>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </ScrollFadeIn>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignInForm />
        </div>
      </div>
    </>
  );
};

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const naviPage = (uri: string) => {
    navigate(uri);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [send, setSend] = useState(false);
  const signinCheck = async (e: React.FormEvent) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/;
    e.preventDefault();
    if (password.length < 8 || password.length > 13) {
      alert('비밀번호는 8자 이상 12자 이하여야 합니다.');
      return;
    }
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 대소문자와 특수문자가 하나라도 포함되어야 합니다.');
      return;
    }
    setSend(true);
  };
  const authSave = useAuthSave();
  const { accessToken } = useAuth();
  useEffect(() => {
    if (!send) return;
    (async () => {
      const { data: axiosResponse } = await fetchData({
        type: 'post',
        uri: '/api/v1/user/signin',
        props: { email, password },
        accessToken,
      });
      if (axiosResponse === null) return;
      if (axiosResponse.data?.errorResponsev2.code !== 'OK') {
        alert(axiosResponse.data?.errorResponsev2.message);
      }
      let token =
        axiosResponse.headers['authorization'] ||
        axiosResponse.headers['Authorization'];

      if (token) {
        console.log(axiosResponse.data.data.id);
        console.log('Access Token:', token);
        authSave({
          userId: axiosResponse.data.data.id,
          accessToken: token,
        });
        naviPage('/');
      } else {
        console.error('Access token not found in headers');
      }
    })();

    //login();
  }, [send]);
  return (
    <ScrollFadeIn delay={0.3}>
      <form
        action="#"
        onSubmit={(e) => signinCheck(e)}
        method="POST"
        className="space-y-6"
      >
        <fieldset>
          <legend className="sr-only">Login</legend>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </fieldset>

        <div>
          <Button
            type="submit"
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-gray-500 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </Button>
        </div>
      </form>
      <p className="mt-3 text-center text-gray-500">
        처음이신가요?{' '}
        <a
          href="#"
          className="font-semibold text-indigo-500 hover:text-indigo-700"
          onClick={() => {
            naviPage('/auth/signup');
          }}
        >
          회원가입하기
        </a>
      </p>
    </ScrollFadeIn>
  );
};

export default Signin;
