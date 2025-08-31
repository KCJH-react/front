export type Item = {
  title: string;
  Url: string;
  points: number;
  itemCategory: ItemCategory;
  //order?: number;
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
    title: string;
    points: number;
  };
};
