import Button from '../../common/component/button';
import { ScrollFadeIn } from '../../common/animation/Ani';
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
  return (
    <ScrollFadeIn delay={0.3}>
      <form action="#" method="POST" className="space-y-6">
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
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-500 hover:text-indigo-700"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

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
        >
          회원가입하기
        </a>
      </p>
    </ScrollFadeIn>
  );
};

export default Signin;
