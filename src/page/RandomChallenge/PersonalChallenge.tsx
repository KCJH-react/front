import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../react-query/reactQuery';
import { useAuth } from '../Auth/authUtility';
import type { Response } from '../../common/type';
import { LoadingAni } from '../../common/animation/Ani';

interface PersonalChallenge {
  personalId: number;
  personalName: string;
  personalCompletionAction: string;
  personalDuration: number;
  personalCategory: string;
}

interface ChallengeItemCardProps {
  challenge: PersonalChallenge;
  onSelect: (id: number) => void; 
}

const ChallengeItemCard: React.FC<ChallengeItemCardProps> = ({ challenge, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between transition-transform hover:scale-105">
      <div>
        <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {challenge.personalCategory}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.personalName}</h3>
        <p className="text-gray-600 text-sm mb-1">
          <strong>완료 조건:</strong> {challenge.personalCompletionAction}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>제한 시간:</strong> {challenge.personalDuration}분
        </p>
      </div>
      <button 
        onClick={() => onSelect(challenge.personalId)}
        className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        고르기
      </button>
    </div>
  );
};


const PersonalChallengePage = () => {
  const { userId } = useAuth();
  // const [userId, setUserId] = useState(11);
  const navigate = useNavigate();
  
  const [challenges, setChallenges] = useState<PersonalChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (userId) {
      const loadChallenges = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetchData({
            uri: `/api/challenge/personal?userId=${userId}`,
            type: 'get',
          });

          if (response.data?.data.data) {
            setChallenges(response.data.data.data);
          } else {
            throw new Error("개인 챌린지 목록을 불러오지 못했습니다.");
          }
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      };
      loadChallenges();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const handleSelectChallenge = (challengeId: number) => {
    navigate(`/challenge/detail/${challengeId}`);
  };

  if (isLoading) return <LoadingAni />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">개인 챌린지 목록</h1>
        
        {challenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeItemCard 
                key={challenge.personalId} 
                challenge={challenge} 
                onSelect={handleSelectChallenge} 
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">생성된 개인 챌린지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PersonalChallengePage;