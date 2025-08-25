import axios from 'axios';

export const changeTimeFormat = (num: number) => {
  let minute = Math.floor(num / 60);
  let second = num % 60;
  const formatedMin = minute < 10 ? '0' + minute : String(minute);
  const formattedSec = second < 10 ? '0' + second : String(second);
  return `${formatedMin} : ${formattedSec}`;
};
