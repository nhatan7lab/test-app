import { useState, useEffect, ChangeEvent } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Score, Player, StyleSheet } from '../../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listPlayer: Player[]) => void;
};

type InputPlayer = Player & { id: string };

const ModalAddPlayer = ({ isOpen, onClose, onSubmit }: Props) => {
  const [listInputPlayer, setListInputPlayer] = useState<InputPlayer[]>(
    [] as InputPlayer[],
  );

  const TIMEOUT: number = 500;
  let debounceTimer: ReturnType<typeof setTimeout>;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const id = event.target.name;
      const currentName = event.target.value;
      const existingPlayerIndex = listInputPlayer.findIndex(
        (player) => player.id === event.target.name,
      );

      if (existingPlayerIndex >= 0) {
        listInputPlayer[existingPlayerIndex].name = currentName;
      } else {
        listInputPlayer.push({
          id,
          name: currentName,
          scores: [] as Score[],
          total: 0,
        });
      }

      const list = listInputPlayer.filter((inputPlayer) => !!inputPlayer.name);

      setListInputPlayer(list);
    }, TIMEOUT);
  };

  const getListPlayer = (): Player[] =>
    listInputPlayer.map(
      (player) =>
        ({
          name: player.name,
          scores: player.scores,
          total: player.total,
        } as Player),
    );

  useEffect(() => {
    setListInputPlayer([]);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={styles.title}>Add Player</DialogTitle>
      <DialogContent>
        {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
          <TextField
            key={num}
            autoFocus
            label={`Player ${num}`}
            name={`player${num}`}
            type='text'
            fullWidth
            onChange={(e) => handleChange(e)}
            variant='standard'
            sx={{
              my: 1,
            }}
          />
        ))}
      </DialogContent>
      <DialogActions sx={styles.action}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={() => onSubmit(getListPlayer())}>
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

export default ModalAddPlayer;
