import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../react-query/reactQuery';
import { useAuth } from '../Auth/authUtility';
import type { Response } from '../../common/type';
import { LoadingAni } from '../../common/animation/Ani';
import Signin from '../Auth/Signin';

interface PersonalChallengeDetail {
  personalId: number;
  personalName: string;
  personalCompletionAction: string;
  personalDuration: number;
  personalCategory: string;
  creatorId: number;
}



const DetailPersonalChallengePage = () => {
//   const { userId } = useAuth();
  const [userId, setUserId] = useState(11);
  const navigate = useNavigate();
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<PersonalChallengeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);  
  const naviPage = (uri: string) => {
    navigate(uri);
  }

  useEffect(() => {
    const loadChallengeDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData({
          uri: `/api/challenge/personal/${challengeId}`,
          type: 'get',
        });

        if (response.data?.data.data) {
          setChallenge(response.data.data.data);
        } else {
          throw new Error("챌린지 상세 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (challengeId) {
      loadChallengeDetail();
    }
  }, [challengeId]);

  //개인챌린지 완료용
    const handleComplete = async (userId: number) => {
    try {
      // if (!userId) {
      //   alert("로그인이 필요합니다.");
      //   return;
      // }
      
      const response = await fetchData({
        type: "post",
        uri: `/api/challenge/personalComplete?userid=${userId}`,
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

//

  if (isLoading) return <LoadingAni />;
  if (error) return <Signin />;
  if (!challenge) return <div>챌린지 정보가 없습니다.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-[650px] bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-6">
        {/* 상단 헤더 */}
        <div className="text-center">
          <span className="inline-block bg-blue-200 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            {challenge.personalCategory}
          </span>
          <h1 className="text-3xl font-bold text-gray-800">{challenge.personalName}</h1>
        </div>

        {/* 정보 섹션 */}
        <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">챌린지 제한시간</p>
            <p className="text-lg font-semibold text-gray-800">{challenge.personalDuration} 분</p>
          </div>
        </div>

        {/* 완료 조건 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">완료 조건</h2>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{challenge.personalCompletionAction}</p>
        </div>

        {/* 시작 버튼 */}
        <div className="text-center pt-4">
          <button
            onClick={() => handleComplete(userId)}
            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            챌린지 완료하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPersonalChallengePage;