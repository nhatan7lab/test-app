import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from '@mui/material';
import { Player } from '../../types';

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
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {listColumn.length > 0 && (
              <TableCell
                sx={{
                  width: 10,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: '#298be6',
                }}
                align='center'
              >
                Round
              </TableCell>
            )}
            {listColumn.map((col, index) => (
              <TableCell
                sx={{ fontSize: '1rem', fontWeight: 600 }}
                key={index}
                align='center'
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listPlayer.length > 0 && (
            <TableRow>
              <TableCell
                align='center'
                sx={{
                  backgroundColor: '#f1f1f1',
                }}
              ></TableCell>
              {getListScoreTotal().map((cell, index) => (
                <TableCell
                  key={index}
                  align='center'
                  sx={{
                    fontSize: '1rem',
                    color: '#fff',
                    fontWeight: 600,
                    backgroundColor: '#e6b429',
                  }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          )}
          {getListScore(round).map((row, indexRow) => (
            <TableRow
              key={indexRow}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                sx={{
                  width: 10,
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: '#f1f1f1',
                }}
                align='center'
              >
                {indexRow + 1}
              </TableCell>
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

export default ListMain;
