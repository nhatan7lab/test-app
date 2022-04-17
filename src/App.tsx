import { useState } from 'react';
import { Fab, IconButton, Grid, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import ModalAddPlayer from './components/Modal/ModalAddPlayer';
import { StyleSheet } from './types';
import TableScore from './components/Table/TableScore';
import ModalAddScore from './components/Modal/ModalAddScore';
import ModalConfirmRefresh from './components/Modal/ModalConfirmRefresh';
import useScoreStore from 'store';

function App() {
  const [isShowModalAddPlayer, setIsShowModalAddPlayer] =
    useState<boolean>(false);
  const [isShowModalAddScore, setIsShowModalAddScore] =
    useState<boolean>(false);
  const [isShowModalRefresh, setIsShowModalRefresh] = useState<boolean>(false);

  const listPlayer = useScoreStore((state) => state.players);

  return (
    <Box sx={styles.main}>
      <Grid container sx={styles.container}>
        <Grid item xs={12} sx={styles.app}>
          <Box sx={styles.header}>
            <Typography sx={styles.title}>List Score</Typography>
            <Box>
              {listPlayer && listPlayer.length > 0 && (
                <IconButton
                  onClick={() => setIsShowModalRefresh(true)}
                  color='primary'
                  sx={styles.icon}
                  aria-label='Refresh'
                >
                  <AutorenewIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <TableScore />

          {listPlayer && listPlayer.length === 0 && (
            <>
              <ModalAddPlayer
                isOpen={isShowModalAddPlayer}
                onClose={() => setIsShowModalAddPlayer(false)}
              />
            </>
          )}

          {listPlayer && listPlayer.length > 0 && (
            <>
              <ModalAddScore
                isOpen={isShowModalAddScore}
                onClose={() => setIsShowModalAddScore(false)}
              />

              <ModalConfirmRefresh
                isOpen={isShowModalRefresh}
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
      width: '60vw',
      position: 'relative',
    },

    '@media (min-width:992px)': {
      width: '40vw',
      position: 'relative',
    },

    height: '100vh',
  },

  app: {
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },

  header: {
    position: 'sticky',
    top: 0,
    px: 2.5,
    py: 1.25,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e6e6e6',
  },

  icon: {
    my: 0.5,
    p: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    border: '1.5px solid #e0e0e0',
    borderRadius: '50%',
    transition: 'all 0.3s',
    boxShadow: 1,
    '&:hover': {
      transform: 'scale(1.1)',
      color: '#d32f2f',
    },
  },

  title: {
    color: '#696969',
    fontSize: '1.3rem',
    fontWeight: 600,
  },

  menu: {
    position: 'absolute',
    bottom: 66,
    right: 66,
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
