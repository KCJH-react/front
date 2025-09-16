import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import {
  AxiosRender,
  fetchData,
  QueryRender,
} from '../../react-query/reactQuery';
import { ScrollFadeIn } from '../../common/animation/Ani';
import '../../index.css';
import Signin from './Signin';
import type { Response } from '../../common/type';
import { Link } from 'react-router-dom';
import { useAuth } from './authUtility';
import type { Item } from '../Items/itemType';

type UserData = {
  imgUrl: string | null;
  username: string;
  email: string;
  points: number;
  goal: number;
  category: string[];
  sex: '남자' | '여자';
  birthday: string;

  // challengeTotal: number;
  // challengeSuccess: number;
  // privateChallenge: number;
  // referencedChallenge: number;
};
type Challenge = {
  id: number;
  title: string;
  points: number;
  level: '쉬움' | '중간' | '어려움';
  date: string;
  isSuccess: boolean;
};
const sampleChallenges: Challenge[] = [
  {
    id: 1,
    title: '1시간 독서',
    points: 30,
    level: '쉬움',
    date: '2025/7/26',
    isSuccess: true,
  },
  {
    id: 1,
    title: '1시간 독서',
    points: 30,
    level: '쉬움',
    date: '2025/7/21',
    isSuccess: false,
  },
  {
    id: 1,
    title: '1시간 독서',
    points: 30,
    level: '쉬움',
    date: '2025/7/1',
    isSuccess: true,
  },
  {
    id: 1,
    title: '1시간 독서',
    points: 30,
    level: '쉬움',
    date: '2025/7/5',
    isSuccess: true,
  },
  {
    id: 1,
    title: '1시간 독서',
    points: 30,
    level: '쉬움',
    date: '2025/7/12',
    isSuccess: false,
  },
];

const Mypage = () => {
  const { userId, accessToken } = useAuth();
  const [myItems, setMyItems] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetchData({
        type: 'post',
        uri: '/points/myItems',
        props: userId,
        accessToken: accessToken,
      });
      if (result.data === null) {
        alert('아이템을 불러오는 데 실패했습니다.');
        return;
      }
      console.log(result.data.data.data);
      setMyItems(result.data.data.data);
    })();
  }, []);
  return (
    <>
      <AxiosRender<Response<UserData>>
        uri={`/api/v1/user?userId=${userId}`}
        type="get"
        onSuccess={(data) => {
          console.log(data.data);
          return <MypageContents userData={data.data!} />;
        }}
        onError={() => <Signin />}
      />
    </>
  );
};

const MypageContents = ({ userData }: { userData: UserData }) => {
  return (
    <div className="bg-white p-4">
      {' '}
      <Profile userData={userData} />
      <QueryRender<UserData>
        onSuccess={(data) => (
          <ChallengeCalendar userChallengeData={sampleChallenges} />
        )}
      ></QueryRender>
    </div>
  );
};
const Profile = ({ userData }: { userData: UserData }) => {
  return (
    <div className="my-5 border-b-2 px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
      <div className="w-full max-w-7xl">
        <UserDetails userData={userData} />
        <UserStatistic userData={userData} />
      </div>
    </div>
  );
};

const ChallengeCalendar = ({
  userChallengeData,
}: {
  userChallengeData: Challenge[];
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(
    currentDate.getDate(),
  );
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const Calendar = () => {
    const today = new Date();
    // 월 이름 배열
    const monthNames = [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ];

    // 요일 배열
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    // 현재 월의 첫 번째 날과 마지막 날
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // 첫 번째 날의 요일 (0: 일요일, 6: 토요일)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // 현재 월의 총 일수
    const daysInMonth = lastDayOfMonth.getDate();

    // 이전 월로 이동
    const goToPreviousMonth = () => {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    // 다음 월로 이동
    const goToNextMonth = () => {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // 오늘인지 확인하는 함수
    const isToday = (day: number) => {
      return (
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth &&
        today.getDate() === day
      );
    };

    // 날짜 클릭 핸들러
    const handleDateClick = (day: number) => {
      setSelectedDate(selectedDate === day ? null : day);
    };

    // 선택된 날짜인지 확인하는 함수
    const isSelected = (day: number) => {
      return selectedDate === day;
    };

    // 달력 날짜 배열 생성
    const calendarDays = [];

    // 이전 월의 마지막 날들로 빈 칸 채우기
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarDays.push(null);
    }

    // 현재 월의 날짜들 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    const isSuccess = (i: number) => {
      for (var c of userChallengeData) {
        const day = new Date(c.date).getDate();
        if (day == i) {
          if (c.isSuccess) {
            return true;
          } else false;
        }
      }
    };
    const isChallengeDay = (i: number) => {
      for (var c of userChallengeData) {
        const challengeDay = new Date(c.date);
        const year = challengeDay.getFullYear();
        const month = challengeDay.getMonth();
        const day = challengeDay.getDate();
        if (day == i && year == currentYear && month == currentMonth) {
          return true;
        }
      }
      return false;
    };

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 헤더 */}
        <div className="bg-[#00EA5E] text-white p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-[#00EA5E]/80 rounded-full transition-colors"
              aria-label="이전 월"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h2 className="text-xl font-semibold">
              {currentYear}년 {monthNames[currentMonth]}
            </h2>

            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-[#00EA5E]/80 rounded-full transition-colors"
              aria-label="다음 월"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 bg-gray-100">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className={`p-3 text-center text-sm font-medium ${
                index === 0
                  ? 'text-red-600'
                  : index === 6
                    ? 'text-[#00EA5E]'
                    : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center border-b border-r border-gray-200 last:border-r-0
          ${day && isChallengeDay(day) ? (isSuccess(day) ? 'bg-green-100' : 'bg-red-100') : ''}`}
            >
              {day && (
                <button
                  onClick={() => handleDateClick(day)}
                  aria-label={`${currentYear}년 ${currentMonth + 1}월 ${day}일 선택`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isToday(day)
                      ? 'bg-indigo-600 text-white'
                      : isSelected(day)
                        ? 'bg-[#00EA5E] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                  } ${index % 7 === 0 && !isToday(day) && !isSelected(day) ? 'text-red-600' : ''} ${
                    index % 7 === 6 && !isToday(day) && !isSelected(day)
                      ? 'text-[#00EA5E]'
                      : ''
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 오늘 날짜 표시 */}
        <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
          오늘: {today.getFullYear()}년 {today.getMonth() + 1}월{' '}
          {today.getDate()}일
        </div>
      </div>
    );
  };
  const CalendarDetail = () => {
    const queryDay = (c: Challenge) => {
      const challengeDay = new Date(c.date);
      const year = challengeDay.getFullYear();
      const month = challengeDay.getMonth();
      const day = challengeDay.getDate();
      if (day == selectedDate && year == currentYear && month == currentMonth) {
        return true;
      }
      return false;
    };
    const matched = sampleChallenges.find((c) => queryDay(c));
    return (
      <div className=" max-w-4xl mx-auto my-5 text-2xl">
        <div className=" text-center text-xl text-white grid sm:grid-cols-4 grid-cols-1 gap-4 bg-[#00EA5E] shadow-xl p-4 rounded-t-md mb-1 font-bold">
          <p>Id</p>
          <p>챌린지 명</p>
          <p>난이도</p>
          <p>포인트</p>
        </div>
        <ul className=" text-center">
          {' '}
          {matched ? (
            <ScrollFadeIn>
              <li className="grid sm:grid-cols-4 grid-cols-1 gap-4 text-gray-500 text-center py-10">
                <p>No.{matched.id}</p>
                <p>{matched.title}</p>
                <p>{matched.level}</p>
                <p>{matched.points}</p>
              </li>
            </ScrollFadeIn>
          ) : (
            <div className="text-gray-500 text-center py-10">
              날짜를 선택해주세요
            </div>
          )}
        </ul>
      </div>
    );
  };
  return (
    <div>
      <ScrollFadeIn>
        <Calendar />
        <CalendarDetail />
      </ScrollFadeIn>
    </div>
  );
};
const UserStatistic = ({ userData }: { userData: UserData }) => {
  return (
    <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
      <div className="text-center md:border-r">
        <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
          {/* {sampleUserData.challengeSuccess} */}10
        </h6>
        <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
          참여한 챌린지
        </p>
      </div>
      <div className="text-center md:border-r">
        <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
          {/* {sampleUserData.privateChallenge} */} 10
        </h6>
        <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
          개인 챌린지
        </p>
      </div>
      <div className="text-center md:border-r">
        <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
          {/* {(sampleUserData.challengeSuccess / sampleUserData.challengeTotal) *
            100} */}
          50 %
        </h6>
        <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
          챌린지 성공률
        </p>
      </div>
      <div className="text-center">
        <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
          {/* {sampleUserData.referencedChallenge} */} 10
        </h6>
        <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
          참고된 챌린지
        </p>
      </div>
    </div>
  );
};

function UserDetails({ userData }: { userData: UserData }) {
  // 생일로부터 나이 계산
  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId, accessToken } = useAuth();
  const [myItems, setMyItems] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetchData({
        type: 'post',
        uri: '/points/myItems',
        props: userId,
        accessToken: accessToken,
      });
      if (result.data === null) {
        alert('아이템을 불러오는 데 실패했습니다.');
        return;
      }
      console.log(result.data.data.data);
      setMyItems(result.data.data.data);
    })();
  }, []);
  const handleMyItem = async () => {
    setIsModalOpen(true);
  };
  return (
    <div className="w-full bg-white border-t-2 overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-transparent h-40 md:h-48 lg:h-56">
        <div className="absolute -bottom-20 left-8 md:left-12 lg:left-16">
          <img
            src={userData.imgUrl || '/placeholder.svg?height=160&width=160'}
            alt={`${userData.username}의 프로필 사진`}
            className="w-40 h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-24 md:pt-28 lg:pt-32 px-6 md:px-12 lg:px-16 pb-10 md:pb-12 lg:pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
              {userData.username}
            </h1>
            <div className="flex items-center text-xl text-gray-500 mb-4">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2L3 7v11a2 2 0 002 2h4v-6h2v6h4a2 2 0 002-2V7l-7-5z" />
              </svg>
              {userData.sex} • {calculateAge(userData.birthday)}세
            </div>
          </div>
        </div>

        {/* All information in card style */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-5">
            프로필 정보
          </h3>
          <Link to="/edit">회원 정보 변경</Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 기본 정보 카드 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-lg text-gray-500 mb-2">성별</div>
              <div className="text-2xl font-medium text-gray-900">
                {userData.sex}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-lg text-gray-500 mb-2">나이</div>
              <div className="text-2xl font-medium text-gray-900">
                {calculateAge(userData.birthday)}세
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-lg text-gray-500 mb-2">내 아이템</div>
              <div className="text-2xl font-medium text-gray-900">
                <button
                  onClick={() => handleMyItem()}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  아이템 확인하기
                </button>

                <ItemModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  data={myItems}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-lg text-gray-500 mb-2">관심 분야</div>
              <div className="text-2xl font-medium text-gray-900">
                {userData.category}
              </div>
            </div>

            {/* 연락처 정보 카드 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-lg text-gray-500 mb-2">이메일</div>
              <a
                href={`mailto:${userData.email}`}
                className="text-2xl font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                {userData.email}
              </a>
            </div>

            {/* 포인트 정보 카드 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-lg text-gray-500 mb-2">포인트</div>
              <div className="text-2xl font-medium text-gray-900">
                {userData.points.toLocaleString()}P
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
interface DataItem {
  id: number;
  itemTitle: string;
  useCode: string;
  createdAt: string;
}

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DataItem[];
}

export function ItemModal({ isOpen, onClose, data }: ItemModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#00EA5E] text-white">
          <h2 className="text-2xl font-semibold">Item List</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#00EA5E]/80 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.itemTitle}
                  </h3>
                  <span className="text-sm text-white bg-[#00EA5E] px-2 py-1 rounded">
                    ID: {item.id}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      Use Code:
                    </span>
                    <code className="text-sm bg-gray-200 px-2 py-1 rounded font-mono text-gray-800">
                      {item.useCode}
                    </code>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      Created:
                    </span>
                    <span className="text-sm text-gray-900">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-[#00EA5E] text-white rounded-lg hover:bg-[#00EA5E]/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
