import { useEffect, useState } from 'react';
import { Axios, AxiosRender } from '../../react-query/reactQuery';
import axios from 'axios';

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
        return (
          <AxiosRender
            uri={'/api/v1/user/check'}
            type="post"
            props={{ email: `${email}`, authnum: `${emailValidNum}` }}
            onSuccess={(data) => {
              return <SignupForm email={email} />;
            }}
          />
        );
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
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6">
      <div className="space-y-3">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-800"
        >
          이메일 주소
        </label>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="example@email.com"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          setEmail(input);
        }}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
      >
        인증번호 요청하기
      </button>
    </div>
  );
};

const EmailValidForm = ({ setEmailValidNum }: EmailValidFormProps) => {
  const [input, setInput] = useState('');
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6">
      <div className="space-y-3">
        <label
          htmlFor="validation"
          className="block text-sm font-semibold text-gray-800"
        >
          인증번호
        </label>
        <input
          type="text"
          name="validation"
          placeholder="인증번호 6자리를 입력하세요"
          id="validation"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          setEmailValidNum(input);
        }}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
      >
        인증하기
      </button>
    </div>
  );
};
//  Added challenge options enum
const challengeOptions = [
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
interface SignupFormProps {
  email: string;
}
const SignupForm = ({ email }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    sex: '',
    birthday: '',
    goal: '',
    preferredChallenge: [] as string[],
    imgUrl: '',
    email: email,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Added handler for challenge checkbox changes
  const handleChallengeChange = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredChallenge: prev.preferredChallenge.includes(challenge)
        ? prev.preferredChallenge.filter((c) => c !== challenge)
        : [...prev.preferredChallenge, challenge],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 데이터:', { ...formData });

    try {
      const response = await axios.post<{ data: any }>(
        'http://localhost:8020/api/v1/user/signup',
        { ...formData },
      );

      console.log(response.data.data);
      // 서버에서 반환받은 URL 저장
    } catch (err) {
      console.error('파일 업로드 실패:', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // FormData 생성
    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const response = await axios.post<{ data: string }>(
        'http://localhost:8020/api/v1/user/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response.data.data);
      // 서버에서 반환받은 URL 저장
      setFormData((prev) => ({
        ...prev,
        imgUrl: response.data.data, // 서버가 주는 URL 사용
      }));
    } catch (err) {
      console.error('파일 업로드 실패:', err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">회원가입</h2>
        <p className="text-sm text-gray-600">
          인증된 이메일:{' '}
          <span className="font-semibold text-purple-600">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-800"
          >
            사용자명 *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="사용자명을 입력하세요"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
          />
        </div>
        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            비밀번호 *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
          />
        </div>

        {/* Sex */}
        <div className="space-y-2">
          <label
            htmlFor="sex"
            className="block text-sm font-semibold text-gray-800"
          >
            성별
          </label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
          >
            <option value="">성별을 선택하세요</option>
            <option value="남자">남성</option>
            <option value="여자">여성</option>
          </select>
        </div>

        {/* Birthday */}
        <div className="space-y-2">
          <label
            htmlFor="birthday"
            className="block text-sm font-semibold text-gray-800"
          >
            생년월일
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
          />
        </div>

        {/* Goal */}
        <div className="space-y-2">
          <label
            htmlFor="goal"
            className="block text-sm font-semibold text-gray-800"
          >
            목표
          </label>
          <textarea
            id="goal"
            name="goal"
            rows={3}
            placeholder="당신의 목표를 입력하세요"
            value={formData.goal}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 resize-none"
          />
        </div>

        {/* Preferred Challenge */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800">
            선호 챌린지 (1개 이상 선택) *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {challengeOptions.map((challenge) => (
              <label
                key={challenge}
                className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={formData.preferredChallenge.includes(challenge)}
                  onChange={() => handleChallengeChange(challenge)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  {challenge}
                </span>
              </label>
            ))}
          </div>
          {formData.preferredChallenge.length === 0 && (
            <p className="text-xs text-red-500">
              최소 1개 이상의 챌린지를 선택해주세요.
            </p>
          )}
        </div>

        {/* Profile Image */}
        <div className="space-y-2">
          <label
            htmlFor="imgUrl"
            className="block text-sm font-semibold text-gray-800"
          >
            프로필 이미지
          </label>
          <input
            type="file"
            id="imgUrl"
            name="imgUrl"
            accept="image/*"
            onChange={(e) => handleFileUpload(e)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};
export default Signup;
