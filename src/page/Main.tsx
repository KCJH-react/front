'use client';

import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/component/button';
import { useEffect, useState } from 'react';
import {
  LoadingAni,
  ScrollFadeIn,
  useTypingAni,
} from '../common/animation/Ani';

type IconType = '🎲' | '🎁' | '🏆';

interface post {
  id: number;
  title: string;
  description: string;
  content: { title: string; href: string };
  icon: IconType;
  gradient: string;
}

const posts: post[] = [
  {
    id: 1,
    title: '랜덤 챌린지 도전',
    description:
      '오늘 해야 할 일을 못 찾겠다면, 랜덤 챌린지가 당신의 시작이 되어줄 거예요. 가볍게 도전하며 동기를 만들어보세요.',
    content: { title: '#Random Challenge', href: '1' },
    icon: '🎲',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: '포인트 교환',
    description:
      '작은 도전들이 쌓이면 보상으로 돌아옵니다. 열심히 한 당신에게 주어지는 특별한 보상!',
    content: { title: '#Point Exchange', href: '2' },
    icon: '🎁',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 3,
    title: '랭킹 시스템',
    description:
      '다른 사람들과의 도전 비교! 순위가 올라갈수록 성취감도 함께 높아져요.',
    content: { title: '#Ranking System', href: '3' },
    icon: '🏆',
    gradient: 'from-amber-500 to-orange-500',
  },
];

interface popularChallenge {
  title: string;
  descripte: string;
  level: string;
  participants?: number;
}

const Main = () => {
  const [loading, setLoading] = useState(false);
  const { text, isEnd } = useTypingAni('랜덤챌린지');

  const popularChallenge = {
    title: '독서 습관 만들기',
    descripte:
      '하루 30분, 가볍게 책을 읽어보세요. 집중력과 사고력 향상에 도움이 되며, 꾸준함이 가져다주는 변화를 경험해보세요.',
    level: '하',
    participants: 1247,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start mb-16">
          {/* 텍스트 영역 (70%) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {/* 배지 */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                새로운 도전의 시작
              </div>

              {/* 메인 제목 */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight">
                {text}
                <span className={`${isEnd ? 'hidden' : 'animate-typing'} `}>
                  |
                </span>
              </h2>

              {/* 설명 */}
              <div className="space-y-2">
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  미루었던 목표를 달성하고 싶으신가요?
                </p>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  작은 도전부터 시작해서{' '}
                  <span className="font-semibold text-purple-600">큰 변화</span>
                  를 만들어보세요.
                </p>
              </div>
            </div>
          </div>
          {/* 추천 챌린지 카드 (30%) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border-2 border-dashed border-purple-200 p-6 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 h-full">
              {loading ? (
                <RecommendedChallenge popularChallenge={popularChallenge} />
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <LoadingAni />
                  <p className="mt-4 text-sm text-gray-600">
                    추천 챌린지를 찾고 있어요...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 기능 카드 섹션 */}
        <ScrollFadeIn yOffset={40}>
          <div className="space-y-12">
            {/* 섹션 제목 */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                주요 기능
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                랜덤챌린지가 제공하는 다양한 기능들을 통해 목표 달성의 재미를
                느껴보세요
              </p>
            </div>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard postCardProps={{ post, index }} />
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default Main;

interface popularChallenge {
  title: string;
  descripte: string;
  level: string;
}

const RecommendedChallenge = ({
  popularChallenge,
}: {
  popularChallenge: popularChallenge;
}) => {
  const getLevelBadge = (level: string) => {
    const styles = {
      하: 'bg-green-100 text-green-800 border-green-200',
      중: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      상: 'bg-red-100 text-red-800 border-red-200',
    };
    return (
      styles[level as keyof typeof styles] ||
      'bg-gray-100 text-gray-800 border-gray-200'
    );
  };
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-orange-600">
          🔥 지금 핫한 챌린지 🔥
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-bold text-gray-900">
        {popularChallenge.title}
      </h3>

      {/* 설명 */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {popularChallenge.descripte}
      </p>

      {/* 정보 배지들 */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getLevelBadge(
            popularChallenge.level,
          )}`}
        >
          난이도: {popularChallenge.level}
        </span>
        {popularChallenge.participants && (
          <span className="text-xs text-gray-500">
            최근
            {popularChallenge.participants.toLocaleString()}명 참여
          </span>
        )}
      </div>

      {/* 버튼 */}
      <div className="pt-2">
        <Button type="button" children="나도 도전하기" className=""></Button>
      </div>
    </div>
  );
};

interface PostCardProps {
  post: post;
  index: number;
}

const PostCard = ({ postCardProps }: { postCardProps: PostCardProps }) => {
  const post = postCardProps.post;
  const index = postCardProps.index;
  const navigate = useNavigate();
  return (
    <article
      key={`${post.id}-${index}`}
      className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/${post.content.href}`);
      }}
    >
      {/* 배경 그라데이션 효과 */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      {/* 아이콘과 배지 */}
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${post.gradient} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          >
            {post.icon}
          </div>
          <Link
            to={post.content.href}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {post.content.title}
            <svg
              className="w-3 h-3"
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
          </Link>
        </div>

        {/* 제목과 설명 */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {post.description}
          </p>
        </div>

        {/* 더보기 링크 */}
        <div className="flex items-center text-purple-600 group-hover:text-purple-700 transition-colors duration-300 pt-2">
          <span className="text-sm font-semibold">자세히 보기</span>
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
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
        </div>
      </div>
    </article>
  );
};
