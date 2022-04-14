import { SxProps, Theme } from '@mui/material';

export type Player = {
  name: string;
  scores: Score[];
  total: number;
};

export type Score = {
  round: number;
  accessor: string;
  score: number;
};

export type StyleSheet = Record<string, SxProps<Theme>>;
