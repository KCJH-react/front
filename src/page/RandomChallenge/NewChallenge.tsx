import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  AxiosRender,
  fetchData,
  QueryRender,
} from '../../react-query/reactQuery';
import { useAuth } from '../Auth/authUtility';
import type { Response } from '../../common/type';
import Signin from '../Auth/Signin';

interface Challenge {
  content: string;
  difficult: "쉬움" | "중간" | "어려움";
  duration: number; // 분 단위
  reason: string;
}

type UserData = {
  imgUrl: string | null;
  username: string;
  email: string;
  points: number;
  goal: number;
  category: string[];
  sex: '남자' | '여자';
  birthday: string;
};

interface ChallengeProps {
  title: string;
  icon: React.ReactNode;
  points: number;
  timeLimit: number;
  startTime: number;
  difficulty: "쉬움" | "중간" | "어려움";
  content: string;
}

interface ChallengeInfoProps {
  title: string;
  infos: string[];
}

const MakeNewChallenge = () => {
  const {userId} = useAuth();
  const [challengeData, setChallengeData] = useState<Challenge | null>(null);
  const [userName, setUserName] = useState();
  const [userCategory, setUserCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        // if (!userId) return;
        const response = await fetchData({
          uri: `/api/chat/challenge?userid=${6}`,
          type: 'get'
        });
        if (response.data?.data) {
          setChallengeData(response.data.data);
        } else {
          throw new Error("챌린지 데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    initialFetch();
  }, [userId]);

    const handleReroll = async () => {
    setIsLoading(true); 
    try {
      // if (!userId) return;
      const response = await fetchData({
        type: "get",
        uri: `/api/chat/test?userid=${6}`,
      });
      if (response.data?.data) {
        setChallengeData(response.data.data);
        window.location.reload();
      } else {
        throw new Error("리롤에 실패했습니다.");
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AxiosRender<Response<Challenge>>
      uri={`/api/chat/challenge?userid=${6}`} 
      type="get"
      onSuccess={(data) => {
        return <NewChallenge challengeData={data.data!} onReroll={handleReroll}/>
      }}
      onError={() => <Signin />}
    />
  );
};

const NewChallenge = ({challengeData, onReroll} : {
  challengeData: Challenge;
  onReroll: () => void;
}) => {
    const getPointsByLevel = (level: Challenge['difficult']): number => {
    switch (level) {
      case "쉬움": return 50;
      case "중간": return 100;
      case "어려움": return 150;
      default: return 0;
    }
  };

    const challengeProps: ChallengeProps = {
    title: "기본 타이틀",
    icon: '💧',
    startTime: Date.now(),
    content: challengeData.content,
    difficulty: challengeData.difficult,
    timeLimit: challengeData.duration * 60 * 1000,
    points: getPointsByLevel(challengeData.difficult),
  };

    const challengeInfoProps: ChallengeInfoProps = {
    title: '이 챌린지를 추천하는 이유',
    infos: [challengeData.reason],
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-5 ml-40 text-left text-2xl/9 font-bold text-gray-900">
        오늘의 랜덤챌린지
      </h2>
      <div className="flex mt-8 mx-auto gap-10">
        <ChallengeCard challengeProps={challengeProps} />
        <ChallengeInfoCard challengeInfoProps={challengeInfoProps} />
      </div>
      <div className="flex justify-center gap-5">
        <button className="mt-8 bg-sky-100 text-sky-800 font-semibold py-2 px-5 rounded-full shadow-md">
          완료하기
        </button>
        <button className="mt-8 bg-sky-100 text-sky-800 font-semibold py-2 px-5 rounded-full shadow-md">
          나만의 챌린지 만들기
        </button>
        <button className="mt-8 bg-sky-100 text-sky-800 font-semibold py-2 px-5 rounded-full shadow-md"
        onClick={onReroll}>
          리롤하기
        </button>
      </div>
    </div>
  );
};


const ChallengeCard = ({ challengeProps }: { challengeProps: ChallengeProps }) => {
  const {
    title,
    icon,
    points,
    timeLimit,
    startTime,
    difficulty,
    content,
  } = challengeProps;
  
  const navigate = useNavigate();

  const [remainingTime, setRemainingTime] = useState(startTime + timeLimit - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = startTime + timeLimit - Date.now();
      setRemainingTime(Math.max(0, newRemainingTime)); 
    }, 1000);
    return () => clearInterval(intervalId);
  }, [startTime, timeLimit]);

  const progressPercentage = (remainingTime / timeLimit) * 100;

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "쉬움":
        return "bg-green-100 text-green-800";
      case "중간":
        return "bg-yellow-100 text-yellow-800";
      case "어려움":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-[650px] bg-white rounded-2xl shadow-lg p-6 border border-gray-200 space-y-4">
      {/*세로 배치*/}
      <div className="flex flex-col items-start justify-between">
        <h2 className="w-full text-center text-xl font-bold text-gray-900">{title} </h2>
        {/* 아이콘, (포인트, 제한시간, 난이도) 가로배치 */}
        <div className="flex items-center gap-10">
            <div className="ml-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100">
                <div className="text-5xl text-gray-700">{icon}</div>
            </div>
            <div className="flex flex-col items-start justify-between gap-1">
              {/* 포인트 */}
              <div className="flex gap-2 items-start justify-between">
                <span className="text-base font-bold text-purple-600">포인트 </span>
                <span className="text-base"> | </span>
                <span className="text-base font-bold">{points.toLocaleString()}점</span>
              </div>
              {/* 제한시간 */}
              <div className="flex gap-2 items-start justify-between">
                <span className="text-base font-bold text-purple-600">제한시간</span>
                <span className="text-base"> | </span>
                <span className="text-base font-bold">{timeLimit / (1000 * 60)}분</span>
              </div>
              {/* 난이도 */}
              <div className="flex gap-2 items-start justify-between">
                <span className="text-base font-bold text-purple-600">난이도 </span>
                <span className="text-base"> | </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                    {difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      {/* 챌린지 내용 */}
      <div className="text-gray-700 leading-relaxed">
        {content}
      </div>
      {/* 시간 진행 바 */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>남은 시간</span>
          {/* 변환된 시, 분, 초를 화면에 표시 */}
          <span>{`${hours}시간 ${minutes}분 ${seconds}초`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-width duration-500" // 부드러운 전환 효과 추가
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ChallengeInfoCard = ({ challengeInfoProps }: { challengeInfoProps: ChallengeInfoProps }) => {
  const { title, infos } = challengeInfoProps;

  return (
    <div className="max-w-md mx-auto bg-emerald-100 text-emerald-900 rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <div className="space-y-2 text-center">
        {infos.map((infoText, index) => (
          <p key={index} className="text-base">
            {infoText}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MakeNewChallenge;