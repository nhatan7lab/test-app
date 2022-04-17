import create, { SetState } from 'zustand';
import produce from 'immer';
import { persist } from 'zustand/middleware';

import { Player, Score } from 'types';

const LOCAL_SCORE_STORE = 'LOCAL_SCORE_STORE';

export type State = {
  players: Player[];
  round: number;
};

export type Actions = {
  addPlayers: (players: Player[]) => void;
  addScore: (score: Score) => void;
  setRound: (value: number) => void;
  refresh: () => void;
};

export type ScoreStore = State & Actions;

const initialState: State = {
  players: [] as Player[],
  round: 1,
};

const useScoreStore = create<ScoreStore>(
  persist(
    (set: SetState<ScoreStore>) => ({
      ...initialState,

      addPlayers: (players: Player[]) => {
        set(
          produce((state: State) => {
            state.players = players;
          }),
        );
      },

      addScore: (score: Score) => {
        set(
          produce((state: State) => {
            const indexPlayer = state.players.findIndex(
              (player) => player.name === score.accessor,
            );

            state.players[indexPlayer].scores.push(score);
            state.players[indexPlayer].total += score.score;
          }),
        );
      },

      setRound: (value: number) => {
        set(
          produce((state: State) => {
            state.round = value;
          }),
        );
      },

      refresh: () => {
        set({ ...initialState });
      },
    }),
    {
      name: LOCAL_SCORE_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useScoreStore;
