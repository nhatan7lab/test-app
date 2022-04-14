import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from '@mui/material';
import { Player, StyleSheet } from '../../types';

type Props = {
  round: number;
  listPlayer: Player[];
};

const ListMain = ({ round, listPlayer }: Props) => {
  const listColumn = listPlayer.map((player) => ({
    header: player.name,
  }));

  const getListScore = (round: number) => {
    const listScore = [];
    for (let i = 1; i < round; i++) {
      const listScoreTmp = [];
      for (let j = 0; j < listColumn.length; j++) {
        const player = listPlayer.find(
          (player) => player.name === listColumn[j].header,
        );
        if (player) {
          const score = player.scores.find((sc) => sc.round === i);
          if (score) {
            listScoreTmp.push(score.score);
          } else {
            listScoreTmp.push(0);
          }
        } else {
          listScoreTmp.push(0);
        }
      }
      listScore.push(listScoreTmp);
    }
    return listScore;
  };

  const getSumScoreByPlayer = (player: Player): number => {
    return player.scores.reduce((total, player) => (total += player.score), 0);
  };

  const getListScoreTotal = (): number[] => {
    return listPlayer.map((player) => getSumScoreByPlayer(player));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {listColumn.length > 0 && (
              <TableCell sx={styles.titleRound}>#</TableCell>
            )}
            {listColumn.map((col, index) => (
              <TableCell sx={styles.cellRound} key={index}>
                {col.header}
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
          {getListScore(round).map((row, indexRow) => (
            <TableRow key={indexRow} sx={styles.row}>
              <TableCell sx={styles.round}>{indexRow + 1}</TableCell>
              {row.map((score, indexScore) => (
                <TableCell key={indexScore} align='center'>
                  {score}
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

export default ListMain;
