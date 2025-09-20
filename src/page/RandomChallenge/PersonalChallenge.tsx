import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../react-query/reactQuery';
import { useAuth } from '../Auth/authUtility';

const CATEGORY_OPTIONS = [
  "미용", "봉사", "여행", "취업", "운동", 
  "학습", "대중문화", "금융", "인간관계"
];

// PersonalChallengePage 컴포넌트 하나로 통합합니다.
const PersonalChallengePage = () => {
  // const { userId } = useAuth();
  const [userId, setUserId] = useState(11);
  const navigate = useNavigate();
  
  const [challengeName, setChallengeName] = useState('');
  const [completionCondition, setCompletionCondition] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = {
      userid: Number(userId),
      personalName: challengeName,
      personalCompletionAction: completionCondition,
      personalDuration: Number(timeLimit),
      personalCategory: selectedCategory,
    };
    try {
      await fetchData({
        type: 'post',
        uri: '/api/challenge/personalChallenge/saveChallenge',
        props: formData
      });
      
      console.log("제출된 챌린지 정보:", formData);
      alert("나만의 챌린지가 생성되었습니다!");
      navigate('/');

    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">나만의 챌린지 만들기</h2>
        
        {/* 챌린지 이름 입력 필드 */}
        <div>
          <label htmlFor="challengeName" className="block text-lg font-semibold text-gray-700 mb-2">
            챌린지의 이름이 뭔가요?
          </label>
          <input
            id="challengeName"
            type="text"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="예: 매일 30분 책 읽기"
          />
        </div>

        {/* 완료 조건 입력 필드 */}
        <div>
          <label htmlFor="completionCondition" className="block text-lg font-semibold text-gray-700 mb-2">
            챌린지의 완료조건이 뭔가요?
          </label>
          <input
            id="completionCondition"
            type="text"
            value={completionCondition}
            onChange={(e) => setCompletionCondition(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="예: 책을 읽고 한 줄 요약 남기기"
          />
        </div>

        {/* 제한 시간 입력 필드 */}
        <div>
          <label htmlFor="timeLimit" className="block text-lg font-semibold text-gray-700 mb-2">
            챌린지의 제한 시간은 얼마인가요?
          </label>
          <input
            id="timeLimit"
            type="text"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="예: 24 (시간 단위)"
          />
        </div>

        {/*  카테고리 선택 필드 */}
        <div>
          <label htmlFor="category-select" className="block text-lg font-semibold text-gray-700 mb-2">
            이 챌린지의 카테고리가 뭔가요?
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 제출 버튼 */}
        <div className="text-center pt-4">
          <button 
            type="submit"
            className="w-1/2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            챌린지 만들기
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalChallengePage;