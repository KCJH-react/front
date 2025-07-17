import { useState } from 'react';
import { ScrollFadeIn } from '../../common/animation/Ani';

type Item = {
  name: string;
  itemImg: string;
  rating: number;
  points: number;
  recentOrder?: number;
};

const items: Item[] = [
  {
    name: '스타벅스 아메리카노',
    itemImg: '/placeholder.svg?height=200&width=200',
    rating: 4.5,
    points: 1500,
    recentOrder: 123,
  },
  {
    name: '투썸 케이크 기프티콘',
    itemImg: '/placeholder.svg?height=200&width=200',
    rating: 4.8,
    points: 2500,
    recentOrder: 98,
  },
  {
    name: 'GS25 편의점 5천원권',
    itemImg: '/placeholder.svg?height=200&width=200',
    rating: 4.2,
    points: 5000,
    recentOrder: 210,
  },
  {
    name: '이마트 상품권 1만원',
    itemImg: '/placeholder.svg?height=200&width=200',
    rating: 4.6,
    points: 10000,
    recentOrder: 76,
  },
  {
    name: '영화 관람권',
    itemImg: '/placeholder.svg?height=200&width=200',
    rating: 4.3,
    points: 8000,
    recentOrder: 185,
  },
  {
    name: '올리브영 상품권',
    itemImg: '/placeholder.svg?height=200&width=200',
    rating: 4.7,
    points: 3000,
    recentOrder: 156,
  },
];
type ItemCardProps = {
  item: Item;
  openModal: (item: Item) => void;
};

const ItemCard = ({ item, openModal }: ItemCardProps) => {
  const { name, itemImg, rating, points, recentOrder } = item;
  return (
    <div className="group relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {recentOrder && recentOrder > 150 && (
        <div
          className="absolute top-4 left-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg"
          style={{ backgroundColor: '#00EA5E' }}
        >
          <span className="inline-block mr-1">🔥</span>
          HOT
        </div>
      )}

      <div className="relative p-6 pb-4">
        <div className="relative overflow-hidden rounded-md bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
          <img
            className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            src={itemImg || '/placeholder.svg'}
            alt={name}
          />
          {/* 이미지 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="relative px-6 pb-6">
        {/* 상품명 */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
          {name}
        </h3>

        {/* 별점 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : index < rating
                      ? 'text-yellow-400 fill-yellow-400/50'
                      : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700 bg-yellow-50 px-2 py-1 rounded-md">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* 최근 주문 정보 */}
        {recentOrder && (
          <div className="flex items-center gap-1 mb-4 text-sm text-gray-500">
            <span style={{ color: '#00EA5E' }}>📊</span>
            <span>최근 주문 {recentOrder.toLocaleString()}건</span>
          </div>
        )}

        {/* 가격 및 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-black">
              {points.toLocaleString()}P
            </span>
            <span className="text-xs text-gray-500">포인트</span>
          </div>

          <button
            className="group/btn relative text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#00EA5E' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00d454';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00EA5E';
            }}
            onClick={() => openModal(item)}
          >
            <div className="flex items-center gap-2">
              <span className="group-hover/btn:animate-bounce">🛒</span>
              <span>담기</span>
            </div>
            {/* 버튼 글로우 효과 */}
            <div
              className="absolute inset-0 rounded-md opacity-0 group-hover/btn:opacity-20 blur transition-opacity duration-300"
              style={{ backgroundColor: '#00EA5E' }}
            />
          </button>
        </div>
      </div>

      {/* 카드 테두리 글로우 효과 */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

const Items = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<Item>();

  const openModal = (item: Item) => {
    setSelectItem(item);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            포인트 상품 교환
          </h1>
          <p className="text-lg text-gray-600">
            다양한 상품을 포인트로 교환해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <ScrollFadeIn>
              <ItemCard key={index} item={item} openModal={openModal} />
            </ScrollFadeIn>
          ))}
        </div>
        {isOpen && selectItem ? (
          <ItemModal closeModal={closeModal} item={selectItem} />
        ) : null}
      </div>
    </div>
  );
};
type ItemModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
  item: Item;
};
const ItemModal = ({ closeModal, item }: ItemModalProps) => {
  const { name, points } = item;
  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => closeModal()}
      >
        <div
          className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-4"
          onClick={(e) => e.stopPropagation()} // 모달 바깥 클릭 시 닫기 방지
        >
          <button
            type="button"
            onClick={() => closeModal()}
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="text-center p-5">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {name} 교환 시 포인트가 차감됩니다. 계속 진행하시겠습니까?
            </h3>
            <button
              onClick={() => closeModal()}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              {points} 포인트 차감
            </button>
            <button
              onClick={() => closeModal()}
              className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
