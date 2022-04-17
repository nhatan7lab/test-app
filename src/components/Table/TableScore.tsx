import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from '@mui/material';

import useScoreStore, { ScoreStore } from 'store';
import { Player, Score, StyleSheet } from 'types';
import { groupBy } from 'utils/array';

const TableScore = () => {
  const listPlayer: Player[] = useScoreStore(
    (state: ScoreStore) => state.players,
  );

  const listHeader: string[] = listPlayer.map((player: Player) => player.name);

  const getListScore = (): Score[][] => {
    const listScore: Score[] = listPlayer
      .map((player: Player) => player.scores)
      .flat();

    const listScoreByRound = groupBy<Score>(
      listScore,
      (score) => `${score.round}`,
    );
    return listScoreByRound;
  };

  const getListScoreTotal = (): number[] =>
    listPlayer.map((player) => player.total);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {listHeader.length > 0 && (
              <TableCell sx={styles.titleRound}>#</TableCell>
            )}
            {listHeader.map((col, index) => (
              <TableCell sx={styles.cellRound} key={index}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listPlayer.length > 0 && (
            <TableRow>
              <TableCell sx={styles.titleTotal}></TableCell>
              {getListScoreTotal().map((cell, index) => (
                <TableCell key={index} sx={styles.cellTotal}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          )}
          {getListScore().map((row: Score[], indexRow: number) => (
            <TableRow key={indexRow} sx={styles.row}>
              <TableCell sx={styles.round}>{indexRow + 1}</TableCell>
              {row.map((score: Score, indexScore: number) => (
                <TableCell key={indexScore} align='center'>
                  {score.score}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const styles: StyleSheet = {
  titleRound: {
    width: 10,
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    backgroundColor: '#298be6',
    textAlign: 'center',
  },

  cellRound: {
    fontSize: '1rem',
    fontWeight: 600,
    textAlign: 'center',
  },

  titleTotal: {
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
  },
  cellTotal: {
    fontSize: '1rem',
    color: '#fff',
    fontWeight: 600,
    backgroundColor: '#e6b429',
    textAlign: 'center',
  },

  row: { '&:last-child td, &:last-child th': { border: 0 } },

  round: {
    width: 10,
    fontSize: '1rem',
    fontWeight: 600,
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
  },
};

export default TableScore;
