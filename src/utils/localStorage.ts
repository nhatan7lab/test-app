import { Player } from '../types';

export const LOCAL_DATA = 'LOCAL_DATA';

export const saveData = (listPlayer: Player[]): void => {
  localStorage.setItem(LOCAL_DATA, JSON.stringify(listPlayer));
};
