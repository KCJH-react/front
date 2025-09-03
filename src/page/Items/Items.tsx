import { useEffect, useState } from 'react';
import { LoadingAni, ScrollFadeIn } from '../../common/animation/Ani';
import { Modal } from '../../common/component/modals';
import type { Item, ItemCardProps, ItemModalProps } from './itemType';
import { fetchData, QueryRender } from '../../react-query/reactQuery';
import { useAuth, useCheckLogin } from '../Auth/authUtility';

const Items = () => {
  return (
    <QueryRender
      uri={'/points/getItems'}
      onSuccess={(data: Item[]) => {
        return <ItemsContent items={data} />;
      }}
    />
  );
};

const ItemsContent = ({ items }: { items: Item[] }) => {
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
            <ScrollFadeIn key={index}>
              <ItemCard item={item} openModal={openModal} />
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

const ItemCard = ({ item, openModal }: ItemCardProps) => {
  const { title, Url, points, itemCategory, purchaseCount } = item;
  return (
    <div className="group relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {purchaseCount > 10 && (
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
            src={Url || '/placeholder.svg'}
            alt={title}
          />
          {/* 이미지 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="relative px-6 pb-6">
        {/* 상품명 */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>

        {/* 주문 정보 */}
        {
          <div className="flex items-center gap-1 mb-4 text-sm text-gray-500">
            <span style={{ color: '#00EA5E' }}>📊</span>
            <span>교환 {purchaseCount}건</span>
          </div>
        }

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

const ItemModal = ({ closeModal, item }: ItemModalProps) => {
  const { title, id, points } = item;
  const [itemFetch, setItemFetch] = useState(false);
  const [result, setResult] = useState<string>('');
  const handleExchange = () => {
    setItemFetch(true);
  };

  const { userId, accessToken } = useAuth();

  const checkLogin = useCheckLogin();
  useEffect(() => {
    if (itemFetch === false) return;
    checkLogin();
    (async () => {
      const { data: response } = await fetchData({
        type: 'post',
        uri: '/points/orders',
        props: { id: userId, itemId: id, quantity: 1 },
        accessToken,
      });
      if (!response) return;
      console.log(response.data?.data);
      setResult(response.data?.errorResponsev2.message);
      setItemFetch(false);
    })();
  }, [itemFetch]);

  const Fetch = () => {
    if (itemFetch) return <LoadingAni />;
    if (result !== '')
      return (
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {result}
        </h3>
      );
    return (
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        {title} 교환 시 포인트가 차감됩니다. 계속 진행하시겠습니까?
      </h3>
    );
  };
  return (
    <Modal closeModal={closeModal}>
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

        <Fetch />
        <button
          onClick={() => {
            handleExchange();
          }}
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
        >
          {points} 포인트 차감
        </button>
        <button
          onClick={closeModal}
          className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          취소
        </button>
      </div>
    </Modal>
  );
};

export default Items;
