export interface Player {
  name: string;
  scores: Score[];
  total: number;
}

export interface Score {
  round: number;
  accessor: string;
  score: number;
}
