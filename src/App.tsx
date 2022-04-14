import { useState, useEffect } from 'react';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ModalAddPlayer from './components/Modal/ModalAddPlayer';
import { Player, StyleSheet } from './types';
import TableScore from './components/Table/TableScore';
import { Grid, Box, Typography } from '@mui/material';
import ModalAddScore from './components/Modal/ModalAddScore';
import ModalConfirmRefresh from './components/Modal/ModalConfirmRefresh';
import {
  saveDataList,
  readDataList,
  saveDataRound,
  readDataRound,
} from './utils/localStorage';

function App() {
  const [isShowModalAddPlayer, setIsShowModalAddPlayer] =
    useState<boolean>(false);
  const [isShowModalAddScore, setIsShowModalAddScore] =
    useState<boolean>(false);
  const [isShowModalRefresh, setIsShowModalRefresh] = useState<boolean>(false);
  const [listPlayer, setListPlayer] = useState<Player[]>([] as Player[]);
  const [round, setRound] = useState<number>(1);

  const handleAddScore = (listPlayer: Player[]) => {
    const currentRound = round;
    setRound(currentRound + 1);
    saveDataRound(currentRound + 1);
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
    saveDataList([]);
    saveDataRound(1);
    setIsShowModalRefresh(false);
  };

  useEffect(() => {
    const list = readDataList();
    const round = readDataRound();
    setListPlayer(list);
    setRound(round);
  }, []);

  useEffect(() => {
    if (listPlayer.length !== 0) saveDataList(listPlayer);
  }, [listPlayer]);

  return (
    <Box sx={styles.main}>
      <Grid container sx={styles.container}>
        <Grid item xs={12} sx={styles.app}>
          <Box sx={styles.header}>
            <Typography sx={styles.title}>List Score</Typography>
            <Box>
              {listPlayer && listPlayer.length > 0 && (
                <>
                  <IconButton
                    onClick={() => setIsShowModalRefresh(true)}
                    color='primary'
                    aria-label='Refresh'
                  >
                    <AutorenewIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
          <TableScore round={round} listPlayer={listPlayer} />

          {listPlayer && listPlayer.length === 0 && (
            <>
              <ModalAddPlayer
                isOpen={isShowModalAddPlayer}
                onClose={() => setIsShowModalAddPlayer(false)}
                onSubmit={handleAddPlayers}
              />
            </>
          )}

          {listPlayer && listPlayer.length > 0 && (
            <>
              <ModalAddScore
                isOpen={isShowModalAddScore}
                onSubmit={handleAddScore}
                listPlayer={listPlayer}
                currentRound={round}
                onClose={() => setIsShowModalAddScore(false)}
              />

              <ModalConfirmRefresh
                isOpen={isShowModalRefresh}
                onSubmit={handleReset}
                onClose={() => setIsShowModalRefresh(false)}
              />
            </>
          )}
        </Grid>

        <Box sx={styles.menu}>
          <Fab
            sx={styles.fabBtn}
            color='primary'
            aria-label='add'
            onClick={() =>
              listPlayer && listPlayer.length > 0
                ? setIsShowModalAddScore(true)
                : setIsShowModalAddPlayer(true)
            }
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grid>
    </Box>
  );
}

const styles: StyleSheet = {
  main: {
    display: 'flex',
    justifyContent: 'center',
  },

  container: {
    '@media (min-width:780px)': {
      width: '40vw',
      position: 'relative',
    },

    height: '98vh',
  },

  app: {
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },

  header: {
    position: 'sticky',
    top: 0,
    px: 2.5,
    py: 2,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e6e6e6',
  },

  title: {
    color: '#696969',
    fontSize: '1.3rem',
    fontWeight: 600,
  },

  menu: {
    position: 'absolute',
    bottom: 54,
    right: 65,
  },

  fabBtn: {
    position: 'fixed',
    '@media (max-width:780px)': {
      bottom: 16,
      right: 16,
    },
  },
};

export default App;
