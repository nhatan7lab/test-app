import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Player } from '../../types';
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

  const handleIncrement = (id: string, round: number): void => {
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
  };

  const handleDecrement = (id: string, round: number): void => {
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
  };

  const handleChange = (id: string, round: number, value: number): void => {
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
  };

  const getScore = (player: Player, round: number) => {
    const score = player.scores.find((score) => score.round === round);
    return score?.score ?? 0;
  };

  useEffect(() => {
    setListPlayerTemp(listPlayer);
  }, [listPlayer]);

  return (
    <Dialog open={isOpen} onClose={onClose} keepMounted={false}>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          backgroundColor: '#1976d2',
          color: '#fff',
        }}
      >
        Add Score
      </DialogTitle>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            minWidth: '400px',
            my: 2,
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              onSubmit(listPlayerTemp);
            }}
          >
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddScore;
