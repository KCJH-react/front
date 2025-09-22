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
import { LoadingAni } from '../../common/animation/Ani';

interface Challenge {
  id: number;
  content: string;
  difficult: "쉬움" | "중간" | "어려움";
  duration: number;
  reason: string;
  createdAt: string;
  success: Boolean;
  username: string;
  category: string[];
}

interface ChallengeProps {
  title: string;
  icon: React.ReactNode;
  points: number;
  timeLimit: number;
  startTime: Date;
  difficulty: "쉬움" | "중간" | "어려움";
  content: string;
}

interface ChallengeInfoProps {
  title: string;
  infos: string[];
}

const CATEGORY_ICONS: { [key: string]: string } = {
  "미용": "💄", "봉사": "❤️", "여행": "✈️", "취업": "💼",
  "운동": "💪", "학습": "📚", "대중문화": "🎬", "금융": "💰", "인간관계": "🤝",
};

const DEFAULT_ICON = "⭐";

const MakeNewChallenge = () => {
  // const {userId} = useAuth();
  const [userId, setUserId] = useState(11);
  const [challengeData, setChallengeData] = useState<Challenge | null>(null);
  const [isReroll, setIsReroll] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const naviPage = (uri: string) => {
    navigate(uri);
  }
    const handleReroll = async () => {
    setIsReroll(true); 
    try {
      // if (!userId) return;
      const response = await fetchData({
        type: "get",
        uri: `/api/chat/test?userid=${userId}`,
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
      setIsReroll(false);
    }
  };

    const handleComplete = async (challengeId: number) => {
    try {
      // if (!userId) {
      //   alert("로그인이 필요합니다.");
      //   return;
      // }
      
      const response = await fetchData({
        type: "post",
        uri: `/api/challenge/complete`,
        props: {
          userId: userId,
          challengeId: challengeId,
        }
      });
      
      if (response.data?.data.data === true) {
        alert("챌린지 완료! 포인트를 획득했습니다.");
        naviPage('/');
      } else {
        throw new Error("챌린지 완료 처리에 실패했습니다.");
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

    if(isReroll == true) {
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingAni />
          <p>새로운 챌린지를 받아오는 중입니다.</p>
        </div>
      )
  }

  return (
    <AxiosRender<Response<Challenge>>
      uri={`/api/chat/challenge?userid=${userId}`} 
      type="get"
      onSuccess={(data) => {
        return <NewChallenge challengeData={data.data!} onComplete={handleComplete} onReroll={handleReroll}/>
      }}
      onError={() => <Signin />}
    />
  );
};

const NewChallenge = ({challengeData, onComplete, onReroll} : {
  challengeData: Challenge;
  onComplete: (challengeId: number) => void;
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
  const navigate = useNavigate();
  const naviPage = (uri: string) => {
    navigate(uri);
  }

  const mainCategory = challengeData.category?.[0];
    const challengeProps: ChallengeProps = {
    title: `${challengeData.username}님을 위한 오늘의 챌린지`,
    icon: mainCategory ? (CATEGORY_ICONS[mainCategory] || DEFAULT_ICON) : DEFAULT_ICON,
    startTime: new Date(challengeData.createdAt.replace(" ", "T")),
    content: challengeData.content,
    difficulty: challengeData.difficult,
    timeLimit: challengeData.duration * 60 * 1000,
    points: getPointsByLevel(challengeData.difficult),
  };

    const [remainingTime, setRemainingTime] = useState(
    challengeProps.startTime.getTime() + challengeProps.timeLimit - Date.now()
  );

      useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = challengeProps.startTime.getTime() + challengeProps.timeLimit - Date.now();
      setRemainingTime(Math.max(0, newRemainingTime));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [challengeProps.startTime, challengeProps.timeLimit]);

    const handleCompleteClick = () => {
    if (remainingTime <= 0) {
      alert("챌린지 제한시간이 초과되었습니다.");
      onReroll();
    } else {
      onComplete(challengeData.id);
    }
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
        <ChallengeCard 
          key={challengeData.content} 
          challengeProps={challengeProps} 
          remainingTime={remainingTime} 
        />
        <ChallengeInfoCard challengeInfoProps={challengeInfoProps} />
      </div>
      <div className="flex justify-center gap-5">
        <button className="mt-8 bg-sky-100 text-sky-800 font-semibold py-2 px-5 rounded-full shadow-md"
        onClick={() => onComplete(challengeData.id)}>
          완료하기
        </button>
        <button className="mt-8 bg-sky-100 text-sky-800 font-semibold py-2 px-5 rounded-full shadow-md"
        onClick={() => naviPage('/challenge/makePersonal')}>
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


const ChallengeCard = ({ challengeProps, remainingTime }: { 
  challengeProps: ChallengeProps;
  remainingTime: number;
}) => {
  const {
    title,
    icon,
    points,
    timeLimit,
    difficulty,
    content,
  } = challengeProps;
  
  const navigate = useNavigate();

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