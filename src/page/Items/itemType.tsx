export type Item = {
  id: number;
  title: string;
  Url: string;
  points: number;
  itemCategory: ItemCategory;
  purchaseCount: number;
};

export type ItemCategory =
  | 'BOOK'
  | 'CAFE'
  | 'CONVENIENCE'
  | 'CULTURE'
  | 'FITNESS'
  | 'FOOD'
  | 'GIFTCARD';

export type ItemCardProps = {
  item: Item;
  openModal: (item: Item) => void;
};

export type ItemModalProps = {
  closeModal: () => void;
  item: {
    id: number;
    title: string;
    points: number;
  };
};
