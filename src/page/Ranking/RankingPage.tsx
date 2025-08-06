import React, { useState } from 'react';
import UserProfileCard from '../../common/component/UserProfileCard';
import RankingToggle from './RankingToggle';
import RankingTable from './RankingTable';

const RankingPage: React.FC = () => {
  const [mode, setMode] = useState<'전체' | '친구'>('전체');

  const totalData = [
    { nickname: '홍길동', level: 100, clearCount: 1000, points: 10000 },
    { nickname: '한성대', level: 100, clearCount: 900, points: 9000 },
    { nickname: '가나다', level: 100, clearCount: 800, points: 8000 },
    { nickname: '마바사', level: 90, clearCount: 700, points: 7000 },
    { nickname: '아자차', level: 90, clearCount: 600, points: 6000 },
  ];

  const friendData = [
    { nickname: '도레미(MY)', level: 30, clearCount: 200, points: 3000 },
    { nickname: '파솔라', level: 15, clearCount: 150, points: 2000 },
    { nickname: '시도레', level: 10, clearCount: 100, points: 1500 },
    { nickname: '미파솔', level: 10, clearCount: 98, points: 1300 },
    { nickname: '라시도', level: 8, clearCount: 70, points: 1000 },
  ];

  const userInfo = {
    nickname: '도레미',
    level: 30,
    clearCount: 200,
    points: 3000,
    totalRank: 3225,
    friendRank: 1,
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-gray-600">
          {mode === '전체' ? '전체 랭킹' : '친구 랭킹'}
        </h2>
      </header>

      <section aria-label="사용자 정보">
        <UserProfileCard {...userInfo} />
      </section>

      <nav aria-label="랭킹 종류 선택">
        <RankingToggle selected={mode} onToggle={setMode} />
      </nav>

      <section aria-label="랭킹 테이블">
        <RankingTable data={mode === '전체' ? totalData : friendData} />
      </section>
    </main>
  );
};


export default RankingPage;
