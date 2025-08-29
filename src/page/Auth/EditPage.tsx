import type React from 'react';
import { useEffect, useState } from 'react';
import { useAxios } from '../../react-query/reactQuery';
import axios from 'axios';

type Challenge =
  | '미용'
  | '봉사'
  | '여행'
  | '취업'
  | '운동'
  | '학습'
  | '대중문화'
  | '금융'
  | '인간관계';

type UserData = {
  img: string | null;
  username: string;
  email: string;
  points: number;
  category: Challenge[];
  sex: '남자' | '여자';
  birthday: string;
  password?: string;
};

type EditableField =
  | 'PROFILE'
  | 'USERNAME'
  | 'EMAIL'
  | 'SEX'
  | 'BIRTHDAY'
  | 'CATEGORY'
  | 'PASSWORD';

const challengeOptions: Challenge[] = [
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

const editFieldOptions = [
  { value: 'PROFILE', label: '프로필 이미지' },
  { value: 'USERNAME', label: '사용자명' },
  { value: 'EMAIL', label: '이메일' },
  { value: 'SEX', label: '성별' },
  { value: 'BIRTHDAY', label: '생년월일' },
  { value: 'CATEGORY', label: '관심 분야' },
  { value: 'PASSWORD', label: '비밀번호' },
];

export default function ProfileEditPage() {
  const [userData, setUserData] = useState<UserData>({
    img: null,
    username: '홍길동',
    email: 'hong@example.com',
    points: 1250,
    category: ['운동', '학습'],
    sex: '남자',
    birthday: '1990-01-01',
    password: '',
  });

  const [send, setSend] = useState(false);
  const [selectedField, setSelectedField] = useState<EditableField | null>(
    null,
  );
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    setSend(true);
    // 실제 저장 로직 구현
    console.log('저장된 데이터:', userData);
  };

  useEffect(() => {
    if (!send) return;

    const fetchData = async () => {
      let content;
      switch (selectedField) {
        case 'USERNAME':
          content = userData.username;
          break;
        case 'EMAIL':
          content = userData.email;
          break;
        case 'SEX':
          content = userData.sex;
          break;
        case 'BIRTHDAY':
          content = userData.birthday;
          break;
        case 'CATEGORY':
          content = userData.category;
          break;
        case 'PASSWORD':
          content = userData.password;
          break;
      }

      try {
        const response = await axios.put(
          'http://localhost:8020/api/v1/user/update/5',
          {
            type: selectedField,
            password,
            content,
          },
        );
        console.log('성공:', response.data);
      } catch (error) {
        console.error('에러:', error);
      } finally {
        setSend(false);
      }
    };

    fetchData();
  }, [send]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            회원 정보 수정
          </h1>
          <p className="text-gray-600">프로필 정보를 업데이트하세요</p>
        </div>
        <PasswordInput setPassword={setPassword} />
        <DecideOption setSelectedField={setSelectedField} />

        <div className="space-y-6">
          <UpdateOption
            selectedField={selectedField}
            setUserData={setUserData}
            category={userData.category}
          />
          <div className="flex justify-end space-x-3 pt-6">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center">
              <span className="mr-2">✕</span>
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={send}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <span className="mr-2">💾</span>
              {send ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PasswordInputProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}
const PasswordInput = ({ setPassword }: PasswordInputProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 ring-2 ring-red-500">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2 mb-2">
          🔒 본인 확인
        </h3>
        <p className="text-sm text-gray-600">
          정보 수정을 위해 비밀번호를 입력해주세요
        </p>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            //value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
            className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
};
interface DecideOptionProps {
  setSelectedField: React.Dispatch<React.SetStateAction<EditableField | null>>;
}
const DecideOption = ({ setSelectedField }: DecideOptionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
          ✏️ 편집할 항목 선택
        </h3>
        <p className="text-sm text-gray-600">수정하고 싶은 정보를 선택하세요</p>
      </div>
      <div className="px-6 pb-6">
        <select
          title="편집할 항목을 선택하세요"
          onChange={(e) => setSelectedField(e.target.value as EditableField)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">편집할 항목을 선택하세요</option>
          {editFieldOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
interface UpdateOptionProps {
  selectedField: EditableField | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  category: Challenge[];
}
const UpdateOption = ({
  selectedField,
  setUserData,
  category,
}: UpdateOptionProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData((prev) => ({ ...prev, img: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCategoryToggle = (co: Challenge) => {
    setUserData((prev) => ({
      ...prev,
      category: prev.category.includes(co)
        ? prev.category.filter((c) => c !== co)
        : [...prev.category, co],
    }));
  };

  switch (selectedField) {
    case 'USERNAME':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              사용자명
            </h3>
            <p className="text-sm text-gray-600">
              사용자명을 변경할 수 있습니다
            </p>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                사용자명
              </label>
              <input
                id="username"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                placeholder="사용자명을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      );
    case 'PROFILE':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              프로필 이미지
            </h3>
            <p className="text-sm text-gray-600">
              프로필 사진을 변경할 수 있습니다
            </p>
          </div>
          <div className="px-6 pb-6 flex items-center space-x-6">
            <div className="relative">
              {/* <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {userData.img ? (
                  <img
                    src={userData.img || '/placeholder.svg'}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-gray-600">
                    {userData.username.charAt(0)}
                  </span>
                )}
              </div> */}
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                <span className="text-white text-sm">📷</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                JPG, PNG 파일을 업로드하세요
              </p>
              <p className="text-xs text-gray-500">최대 5MB</p>
            </div>
          </div>
        </div>
      );
    case 'EMAIL':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">이메일</h3>
            <p className="text-sm text-gray-600">
              이메일 주소를 변경할 수 있습니다
            </p>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      );
    case 'SEX':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">성별</h3>
            <p className="text-sm text-gray-600">성별을 변경할 수 있습니다</p>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="sex"
                className="text-sm font-medium text-gray-700"
              >
                성별
              </label>
              <select
                title="성별 선택"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    sex: e.target.value as '남자' | '여자',
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">성별을 선택하세요</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </div>
          </div>
        </div>
      );
    case 'BIRTHDAY':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              생년월일
            </h3>
            <p className="text-sm text-gray-600">
              생년월일을 변경할 수 있습니다
            </p>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="birthday"
                className="text-sm font-medium text-gray-700"
              >
                생년월일
              </label>
              <input
                id="birthday"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    birthday: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      );
    case 'CATEGORY':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              관심 분야
            </h3>
            <p className="text-sm text-gray-600">
              관심 있는 카테고리를 선택하세요 (복수 선택 가능)
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-2">
              {challengeOptions.map((co) => (
                <button
                  key={co}
                  onClick={() => handleCategoryToggle(co)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    category.includes(co)
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {co}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              선택된 카테고리: {category.length}개
            </p>
          </div>
        </div>
      );
    case 'PASSWORD':
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 ring-2 ring-blue-500 shadow-lg">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              비밀번호
            </h3>
            <p className="text-sm text-gray-600">
              비밀번호를 변경할 수 있습니다
            </p>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="새 비밀번호를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      );
  }
};
