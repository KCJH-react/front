import { UserCircleIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import { ScrollFadeIn } from '../../common/animation/Ani';
import { useEffect, useState } from 'react';
import Button from '../../common/component/button';
import { changeTimeFormat } from '../../common/utility/utility';

const Signup = () => {
  const [signupOrder, setSignupOrder] = useState(1);
  const viewForm = () => {
    switch (signupOrder) {
      case 1:
        return <EmailInputForm setSignupOrder={setSignupOrder} />;
      case 2:
        return <VerifyForm setSignupOrder={setSignupOrder} />;
      case 3:
        return <SignupForm />;
    }
  };
  return <div className="md:px-20 lg:px-60 my-10">{viewForm()}</div>;
};

type SignupProps = {
  setSignupOrder: React.Dispatch<React.SetStateAction<number>>;
};

const EmailInputForm = ({ setSignupOrder }: SignupProps) => {
  return (
    <ScrollFadeIn>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 bg-white p-5 rounded-md shadow-md"
      >
        <fieldset className="flex-[8]">
          <legend>내 이메일로 인증코드 받기</legend>
          <FormInputDetail
            formType="email"
            subject="이메일"
            name="email"
            placeholder="example@gmail.com"
          />
        </fieldset>
        <Button
          children="인증번호 요청"
          className="flex-[1] translate-y-[17px]"
          type="submit"
          onClick={() => setSignupOrder((prev) => prev + 1)}
        />
      </form>
    </ScrollFadeIn>
  );
};
const VerifyForm = ({ setSignupOrder }: SignupProps) => {
  const [time, setTime] = useState(120);
  useEffect(() => {
    if (time <= 0) return;
    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
      console.log(time);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);
  return (
    <ScrollFadeIn>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col lg:flex-row items-center sm:gap-2 bg-white p-5 rounded-md shadow-md"
      >
        <fieldset className="flex-[9]">
          <legend>인증번호 검사</legend>
          <FormInputDetail
            formType="text"
            subject="인증번호"
            name="verify"
            placeholder=""
          />
        </fieldset>
        <div className="flex flex-col flex-[2] md:translate-y-[14px] translate-y-[0px]">
          <Button
            children={`인증 ${changeTimeFormat(time)}`}
            className="w-full"
            type="submit"
            onClick={() => setSignupOrder((prev) => prev + 1)}
          />
        </div>
      </form>
    </ScrollFadeIn>
  );
};
const SignupForm = () => {
  return (
    <ScrollFadeIn>
      <form
        className="mx-30 bg-white rounded-md shadow-md py-10 px-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-8">
          <fieldset>
            <div className="border-b border-gray-900/10 pb-12">
              <legend>
                <h2 className="text-xl font-bold text-gray-900">
                  회원정보 입력
                </h2>
              </legend>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium font-bold text-gray-900 mb-5"
                >
                  프로필 사진
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-gray-300"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <FormRadioSex />
            <FormSelectDate />
            <FormInputDetail
              formType="text"
              subject="이름"
              name="username"
              placeholder="홍길동"
            />
            <FormInputDetail
              formType="email"
              subject="이메일"
              name="email"
              placeholder="example@gmail.com"
            />
            <FormInputDetail
              formType="password"
              subject="비밀번호"
              name="password"
              placeholder="qwer1234"
            />
            <FormInputDetail
              formType="text"
              subject="현재 이루고 싶은 목표"
              name="goal"
              placeholder="해외여행 비용 모으기"
            />
            <FormCheckChallenge />
          </fieldset>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm/6 font-semibold text-gray-900"
          >
            리셋
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            완료
          </button>
        </div>
      </form>
    </ScrollFadeIn>
  );
};

type FromType = 'email' | 'password' | 'image' | 'date' | 'text';
type FromInputDetailProps = {
  formType: FromType;
  subject: string;
  name: string;
  placeholder: string;
  className?: string;
};
const FormInputDetail = ({
  formType,
  subject,
  name,
  placeholder,
  className = '',
}: FromInputDetailProps) => {
  return (
    <div className={`my-20 gap-x-6 gap-y-8 sm:grid-cols-6 ${className}`}>
      <div className="sm:col-span-4 flex-col sm:flex-row flex sm:items-center">
        <label
          htmlFor={name}
          className="block text-gray-900 font-medium flex-1 my-auto translate-y-[5px]"
        >
          {subject}
        </label>
        <div className="mt-2 flex-1">
          <input
            id={name}
            type={formType}
            name={name}
            placeholder={placeholder}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};
const FormRadioSex = () => {
  return (
    <fieldset className="flex justify-between flex-col sm:flex-row my-10">
      <legend className="font-medium">성별</legend>
      <div className="flex-1"></div>
      <div className="flex-1 flex justify-end">
        <div className="flex-1 items-center">
          <input
            id="male-radio"
            type="radio"
            name="sex-radio"
            value="male"
            className="w-5 h-5 translate-y-[4px]"
          />
          <label
            htmlFor="male-radio"
            className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
          >
            남성
          </label>
        </div>

        <div className="flex-1 items-center">
          <input
            id="female-radio"
            type="radio"
            name="sex-radio"
            value="female"
            defaultChecked
            className="w-5 h-5 translate-y-[4px]"
          />
          <label
            htmlFor="female-radio"
            className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-500"
          >
            여성
          </label>
        </div>
      </div>
    </fieldset>
  );
};
const Challenges = [
  '미용',
  '봉사',
  '여행',
  '취업',
  '운동',
  '학습',
  '대중문화',
  '금융',
  '인간관계',
];
const FormCheckChallenge = () => {
  const ChallengeCheckBox = ({ name }: { name: string }) => {
    return (
      <div className="flex-1 items-center mb-4">
        <input
          id={name}
          type="checkbox"
          value={name}
          className="translate-y-[3px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={name}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {name}
        </label>
      </div>
    );
  };
  return (
    <fieldset className="">
      <legend className="font-medium mb-10">선호 챌린지 선택</legend>
      <div className="flex flex-col lg:flex-row">
        {Challenges.map((c) => {
          return <ChallengeCheckBox name={c} />;
        })}
      </div>
    </fieldset>
  );
};
const FormSelectDate = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center my-5">
      <p className="flex-1 font-medium sm:mb-0">생년월일</p>
      <div className="flex-1 flex justify-end translate-y-[20px]">
        <DatePicker
          className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
          selected={new Date()}
        />
      </div>
    </div>
  );
};

export default Signup;
