import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import ItemScore from 'components/Shared/ItemAddScore';
import useDebounce from 'hooks/useDebounce';
import { Player, Score, StyleSheet } from 'types';
import useScoreStore, { ScoreStore } from 'store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAddScore = ({ isOpen, onClose }: Props) => {
  const listPlayer = useScoreStore((state: ScoreStore) => state.players);
  const currentRound = useScoreStore((state: ScoreStore) => state.round);
  const addScore = useScoreStore((state: ScoreStore) => state.addScore);
  const setRound = useScoreStore((state: ScoreStore) => state.setRound);

  const getInitialScore = useCallback(
    (): Score[] =>
      listPlayer.map((player: Player) => ({
        accessor: player.name,
        score: 0,
        round: currentRound,
      })),
    [currentRound, listPlayer],
  );

  const [listScore, setListScore] = useState<Score[]>(getInitialScore());

  const handleSetScore = (id: string, value: number) => {
    const indexScore = listScore.findIndex((score) => score.accessor === id);
    if (indexScore >= 0) {
      listScore[indexScore].score = value;
      setListScore([...listScore]);
    }
  };

  const [handleSubmit] = useDebounce(() => {
    listScore.map((score) => addScore(score));
    setRound(currentRound + 1);
    onClose();
  });

  useEffect(() => {
    setListScore(getInitialScore());
  }, [getInitialScore, isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>Add Score</DialogTitle>
      <DialogContent>
        {listPlayer.map((player, index) => (
          <ItemScore
            key={index}
            id={player.name}
            name={player.name}
            onChange={handleSetScore}
          />
        ))}
      </DialogContent>
      <DialogActions sx={styles.action}>
        <Button variant='outlined' size='medium' onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='contained'
          size='medium'
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles: StyleSheet = {
  title: {
    py: 2,
    fontWeight: 600,
    fontSize: '1.4rem',
    backgroundColor: '#1976d2',
    color: '#fff',
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    mr: 2,
    mb: 1,
  },
};

export default ModalAddScore;
