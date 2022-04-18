import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { Score, Player, StyleSheet } from 'types';
import useDebounce from 'hooks/useDebounce';
import useScoreStore, { ScoreStore } from 'store';
import ItemAddPlayer from 'components/Shared/ItemAddPlayer';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type InputPlayer = Player & { id: string };

const ModalAddPlayer = ({ isOpen, onClose }: Props) => {
  const [listInputPlayer, setListInputPlayer] = useState<InputPlayer[]>(
    [] as InputPlayer[],
  );

  const addPlayers = useScoreStore((state: ScoreStore) => state.addPlayers);

  const handleChange = useCallback((id: string, name: string) => {
    const existingPlayerIndex = listInputPlayer.findIndex(
      (player: InputPlayer) => player.id === id,
    );

    if (existingPlayerIndex >= 0) {
      listInputPlayer[existingPlayerIndex].name = name;
    } else {
      listInputPlayer.push({
        id,
        name,
        scores: [] as Score[],
        total: 0,
      });
    }

    const list = listInputPlayer
      .filter(
        (inputPlayer: InputPlayer, index: number, self: InputPlayer[]) =>
          inputPlayer.name !== '' &&
          index === self.findIndex((_) => _.name === inputPlayer.name),
      )
      .sort((player1, player2) => player1.id.localeCompare(player2.id));

    setListInputPlayer(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListPlayer = useCallback(
    (listInputPlayer: InputPlayer[]): Player[] =>
      listInputPlayer.map(
        (player) =>
          ({
            name: player.name,
            scores: player.scores,
            total: player.total,
          } as Player),
      ),
    [],
  );

  const [handleSetPlayers] = useDebounce(() => {
    addPlayers(getListPlayer(listInputPlayer));
    onClose();
  });

  useEffect(() => {
    setListInputPlayer([]);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={styles.title}>Add Player</DialogTitle>
      <DialogContent>
        {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
          <ItemAddPlayer
            key={num}
            autoFocus={num === 1}
            label={`Player ${num}`}
            name={`player${num}`}
            type='text'
            fullWidth
            onSetName={handleChange}
            variant='standard'
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
          onClick={handleSetPlayers}
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

export default ModalAddPlayer;
