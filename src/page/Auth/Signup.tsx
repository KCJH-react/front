import { UserCircleIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import { ScrollFadeIn } from '../../common/animation/Ani';
import { useEffect, useState } from 'react';
import Button from '../../common/component/button';
import { changeTimeFormat } from '../../common/utility/utility';
import type { emailRequest, SignupRequest } from './authType';
import { post, type Response } from '../../common/type';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AxiosRender } from '../../react-query/reactQuery';

const Signup = () => {
  const [signupOrder, setSignupOrder] = useState(1);
  const [email, setEmail] = useState('');
  const [emailValidNum, setEmailValidNum] = useState('');

  useEffect(() => {
    if (email === '') return;
    setSignupOrder(2);
  }, [email]);

  useEffect(() => {
    if (emailValidNum === '') return;
    setSignupOrder(3);
  }, [emailValidNum]);

  const viewForm = () => {
    switch (signupOrder) {
      case 1:
        return <EmailInputForm setEmail={setEmail} />;
      case 2:
        return (
          <AxiosRender
            uri={'/api/v1/user/send'}
            type="post"
            props={{ email: `${email}` }}
            onSuccess={(data) => {
              return <EmailValidForm setEmailValidNum={setEmailValidNum} />;
            }}
          />
        );
      case 3:
        return <SignupForm />;
    }
  };
  return <div className="md:px-20 lg:px-60 my-10">{viewForm()}</div>;
};

interface EmailInputFormProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}
interface EmailValidFormProps {
  setEmailValidNum: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInputForm = ({ setEmail }: EmailInputFormProps) => {
  const [input, setInput] = useState('');

  return (
    <div>
      <label htmlFor="email">email</label>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="example@email.com"
        onChange={(e) => {
          e.preventDefault();
          setInput(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          setEmail(input);
        }}
      >
        요청하기
      </button>
    </div>
  );
};
const EmailValidForm = ({ setEmailValidNum }: EmailValidFormProps) => {
  const [input, setInput] = useState('');
  return (
    <div>
      <label htmlFor="validation">validation code</label>
      <input
        type="text"
        name="validation"
        placeholder="인증번호 입력"
        id="validation"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        onClick={() => {
          setEmailValidNum(input);
        }}
      >
        요청하기
      </button>
    </div>
  );
};
const SignupForm = () => {
  return <div>Signup</div>;
};

export default Signup;
