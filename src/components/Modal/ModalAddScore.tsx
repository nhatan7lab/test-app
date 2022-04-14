import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Player, StyleSheet } from '../../types';
import ItemScore from '../Shared/ItemAddScore';

type Props = {
  isOpen: boolean;
  listPlayer: Player[];
  currentRound: number;
  onClose: () => void;
  onSubmit: (listPlayer: Player[]) => void;
};

const ModalAddScore = ({
  isOpen,
  listPlayer,
  currentRound,
  onClose,
  onSubmit,
}: Props) => {
  const [listPlayerTemp, setListPlayerTemp] = useState<Player[]>(listPlayer);

  let debounceTimer: ReturnType<typeof setTimeout>;
  const TIMEOUT: number = 500;

  const debounce = (
    callback: (id: string, round: number, value?: number) => void,
    time: number,
  ): void => {
    clearTimeout(debounceTimer);
    setTimeout(callback, time);
  };

  const handleIncrement = (id: string, round: number): void =>
    debounce(() => {
      const indexPlayer = listPlayerTemp.findIndex(
        (player) => player.name === id,
      );
      if (indexPlayer >= 0) {
        const indexScore = listPlayerTemp[indexPlayer].scores.findIndex(
          (score) => score.round === round,
        );
        if (indexScore >= 0) {
          listPlayerTemp[indexPlayer].scores[indexScore].score++;
          listPlayerTemp[indexPlayer].total++;
        } else {
          listPlayerTemp[indexPlayer].scores.push({
            accessor: listPlayerTemp[indexPlayer].name,
            score: 1,
            round,
          });
          listPlayerTemp[indexPlayer].total++;
        }

        setListPlayerTemp([...listPlayerTemp]);
      }
    }, TIMEOUT);

  const handleDecrement = (id: string, round: number): void =>
    debounce(() => {
      const indexPlayer = listPlayerTemp.findIndex(
        (player) => player.name === id,
      );
      if (indexPlayer >= 0) {
        const indexScore = listPlayerTemp[indexPlayer].scores.findIndex(
          (score) => score.round === round,
        );
        if (indexScore >= 0) {
          listPlayerTemp[indexPlayer].scores[indexScore].score--;
          listPlayerTemp[indexPlayer].total--;
        } else {
          listPlayerTemp[indexPlayer].scores.push({
            accessor: listPlayerTemp[indexPlayer].name,
            score: -1,
            round,
          });
          listPlayerTemp[indexPlayer].total--;
        }

        setListPlayerTemp([...listPlayerTemp]);
      }
    }, TIMEOUT);

  const handleChange = (id: string, round: number, value: number): void =>
    debounce(() => {
      const indexPlayer = listPlayerTemp.findIndex(
        (player) => player.name === id,
      );
      if (indexPlayer >= 0) {
        const indexScore = listPlayerTemp[indexPlayer].scores.findIndex(
          (score) => score.round === round,
        );
        if (indexScore >= 0) {
          listPlayerTemp[indexPlayer].scores[indexScore].score = value;
          listPlayerTemp[indexPlayer].total += value;
        } else {
          listPlayerTemp[indexPlayer].scores.push({
            accessor: listPlayerTemp[indexPlayer].name,
            score: value,
            round,
          });
          listPlayerTemp[indexPlayer].total = value;
        }
      }

      setListPlayerTemp([...listPlayerTemp]);
    }, TIMEOUT);

  const getScore = (player: Player, round: number) => {
    const score = player.scores.find((score) => score.round === round);
    return score?.score ?? 0;
  };

  useEffect(() => {
    setListPlayerTemp(listPlayer);
  }, [listPlayer]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>Add Score</DialogTitle>
      <DialogContent>
        {listPlayerTemp.map((player, index) => (
          <ItemScore
            key={index}
            id={player.name}
            name={player.name}
            round={currentRound}
            score={getScore(player, currentRound)}
            onChange={handleChange}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
      </DialogContent>
      <DialogActions sx={styles.action}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant='contained'
          onClick={() => {
            debounce(() => onSubmit(listPlayerTemp), 300);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles: StyleSheet = {
  title: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
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
