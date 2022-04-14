import { Player } from '../types';

export const LOCAL_DATA_LIST = 'LOCAL_DATA_LIST';
export const LOCAL_DATA_ROUND = 'LOCAL_DATA_ROUND';

export const saveDataList = (listPlayer: Player[]): void => {
  localStorage.setItem(LOCAL_DATA_LIST, JSON.stringify(listPlayer));
};

export const readDataList = (): Player[] => {
  const data: string = localStorage.getItem(LOCAL_DATA_LIST) || '[]';
  try {
    return JSON.parse(data) as Player[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const saveDataRound = (round: number): void => {
  localStorage.setItem(LOCAL_DATA_ROUND, round + '');
};

export const readDataRound = (): number => {
  const round = localStorage.getItem(LOCAL_DATA_ROUND);
  if (round) return +round;
  return 1;
};
