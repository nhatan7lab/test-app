import { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ModalAddPlayer from './components/Modal/ModalAddPlayer';
import { Player } from './types';
import ListMain from './components/Table/TableScore';
import { Button, Box, Typography } from '@mui/material';
import ModalAddScore from './components/Modal/ModalAddScore';

function App() {
  const [isShowModalAddPlayer, setIsShowModalAddPlayer] =
    useState<boolean>(false);
  const [isShowModalAddScore, setIsShowModalAddScore] =
    useState<boolean>(false);
  const [listPlayer, setListPlayer] = useState<Player[]>([] as Player[]);
  const [round, setRound] = useState<number>(1);

  const handleAddScore = (listPlayer: Player[]) => {
    setRound(round + 1);
    setListPlayer(listPlayer);
    setIsShowModalAddScore(false);
  };

  const handleAddPlayers = (listPlayer: Player[]) => {
    setIsShowModalAddPlayer(false);
    setListPlayer(listPlayer);
  };

  const handleReset = () => {
    setListPlayer([]);
    setRound(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          minWidth: '600px',
          minHeight: '800px',
          position: 'relative ',
          backgroundColor: '#f5f5f5',
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            backgroundColor: '#f1f1f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e6e6e6',
          }}
        >
          <Typography
            sx={{
              color: '#424242',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            List Score
          </Typography>
          <Box>
            {listPlayer && listPlayer.length > 0 && (
              <>
                <Button
                  variant='contained'
                  onClick={() => setIsShowModalAddScore(true)}
                >
                  Add Score
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: '#b23c17',
                    ml: 1.5,
                  }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </>
            )}
          </Box>
        </Box>
        <ListMain round={round} listPlayer={listPlayer} />

        {listPlayer && listPlayer.length === 0 && (
          <>
            <Fab
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
              }}
              color='primary'
              aria-label='add'
              onClick={() => setIsShowModalAddPlayer(true)}
            >
              <AddIcon />
            </Fab>
            <ModalAddPlayer
              isOpen={isShowModalAddPlayer}
              onClose={() => setIsShowModalAddPlayer(false)}
              onSubmit={handleAddPlayers}
            />
          </>
        )}

        {listPlayer && listPlayer.length > 0 && (
          <ModalAddScore
            isOpen={isShowModalAddScore}
            onSubmit={handleAddScore}
            listPlayer={listPlayer}
            currentRound={round}
            onClose={() => setIsShowModalAddScore(false)}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
