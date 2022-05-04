import { CSSProperties, useCallback } from 'react';
import { Box } from '@mui/material';
import { FaPoop } from 'react-icons/fa';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import useScoreStore, { ScoreStore } from 'store';
import { Player, Score, StyleSheet } from 'types';
import { groupBy } from 'utils/array';

const TableScore = () => {
  const listPlayer: Player[] = useScoreStore(
    (state: ScoreStore) => state.players,
  );

  type Header = {
    name: string;
    top: number;
  };

  const getTopByTotalScore = useCallback(
    (listPlayer: Player[], total: number): number => {
      const listSorted = [...listPlayer].sort((a, b) => b.total - a.total);
      const index = listSorted.findIndex((player) => player.total === total);

      return index >= 0 ? index + 1 : index;
    },
    [],
  );

  const listHeader: Header[] = listPlayer.map((player: Player) => ({
    name: player.name,
    top: getTopByTotalScore(listPlayer, player.total),
  }));

  const getListScore = (): Score[][] => {
    const listScore: Score[] = listPlayer
      .map((player: Player) => player.scores)
      .flat();

    const listScoreByRound = groupBy<Score>(
      listScore,
      (score) => `${score.round}`,
    ).reverse();

    return listScoreByRound;
  };

  const getListScoreTotal = (): number[] =>
    listPlayer.map((player) => player.total);

  const getTopIcon = (top: number) => {
    const style: CSSProperties = {
      fontSize: '2rem',
    };

    const styleGolden: CSSProperties = {
      color: '#fbc02d',
    };

    const styleSliver: CSSProperties = {
      color: ' #C0C0C0',
    };

    const styleBronze: CSSProperties = {
      color: '#CD7F32',
    };

    const styleShit: CSSProperties = {
      color: '#795548',
    };

    switch (top) {
      case 1:
        return (
          <WorkspacePremiumIcon
            style={{
              ...style,
              ...styleGolden,
            }}
          />
        );
      case 2:
        return (
          <MilitaryTechIcon
            style={{
              ...style,
              ...styleSliver,
            }}
          />
        );
      case 3:
        return (
          <MilitaryTechIcon
            style={{
              ...style,
              ...styleBronze,
            }}
          />
        );
      case 4:
        return (
          <FaPoop
            style={{
              ...styles,
              ...styleShit,
            }}
          />
        );
    }
  };

  return (
    <>
      <Box sx={styles.header}>
        <Box sx={styles.row}>
          {listHeader.map((col, index) => (
            <Box
              sx={{
                ...styles.cell,
                position: 'relative',
                px: 0.5,
                '@media (max-width:600px)': {
                  py: 4,
                },
              }}
              key={index}
            >
              {getListScore().length > 0 && (
                <Box sx={styles.medal}>{getTopIcon(col.top)}</Box>
              )}
              {col.name}
            </Box>
          ))}
        </Box>
        <Box sx={styles.row}>
          {getListScoreTotal().map((col, index) => (
            <Box sx={styles.cellTotal} key={index}>
              {col}
            </Box>
          ))}
        </Box>
        <Box sx={styles.body}>
          {getListScore().map((row: Score[], indexRow: number) => (
            <Box key={indexRow} sx={styles.row}>
              {row.map((score: Score, indexScore: number) => (
                <Box key={indexScore} sx={styles.cell}>
                  {score.score}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

const styles: StyleSheet = {
  header: {
    position: 'sticky',
    top: '63px',
  },

  body: {
    overflow: 'auto',
    height: 'calc(100vh - 220px)',
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  cell: {
    fontSize: '1.3rem',
    fontWeight: 700,
    textAlign: 'center',
    px: 2,
    py: 2,
    flex: '1 1 0',
    backgroundColor: '#fff',
    wordBreak: 'break-word',
    borderBottom: '2px solid #eee',
  },

  medal: {
    position: 'absolute',
    top: 3,
    left: 3,
  },

  cellTotal: {
    fontSize: '1.3rem',
    fontWeight: 700,
    textAlign: 'center',
    px: 2,
    py: 2,
    flex: '1 1 0',
    wordBreak: 'break-word',
    borderBottom: '2px solid #eee',
    color: '#fff',
    backgroundColor: '#e6b429',
  },

  icon: {
    fontSize: '2rem',
  },
};

export default TableScore;
