import { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import { Score, Player } from '../../types';

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
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

    setListInputPlayer([...listInputPlayer]);
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
    <Dialog open={isOpen} onClose={onClose} keepMounted={false}>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          backgroundColor: '#1976d2',
          color: '#fff',
        }}
      >
        Add Player
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label='Player 1'
          name='player1'
          type='text'
          fullWidth
          onChange={(e) => handleChange(e)}
          variant='standard'
          sx={{
            my: 1,
          }}
        />

        <TextField
          autoFocus
          label='Player 2'
          name='player2'
          type='text'
          fullWidth
          onChange={(e) => handleChange(e)}
          variant='standard'
          sx={{
            my: 1,
          }}
        />

        <TextField
          autoFocus
          label='Player 3'
          name='player3'
          type='text'
          fullWidth
          onChange={(e) => handleChange(e)}
          variant='standard'
          sx={{
            my: 1,
          }}
        />

        <TextField
          autoFocus
          label='Player 4'
          name='player4'
          type='text'
          fullWidth
          onChange={(e) => handleChange(e)}
          variant='standard'
          sx={{
            my: 1,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            minWidth: '400px',
            my: 1,
          }}
        >
          <Button variant='contained' onClick={() => onSubmit(getListPlayer())}>
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPlayer;
