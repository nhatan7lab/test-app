import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

import useScoreStore, { ScoreStore } from 'store';
import { StyleSheet } from 'types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalConfirmRefresh = ({ isOpen, onClose }: Props) => {
  const refresh = useScoreStore((state: ScoreStore) => state.refresh);

  const handleSubmit = (): void => {
    onClose();
    refresh();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography sx={styles.content}>
          Would you like to refresh all the data?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' size='medium' onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='contained'
          size='medium'
          sx={styles.btn}
          onClick={handleSubmit}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles: StyleSheet = {
  title: {
    py: 2,
    fontWeight: 600,
    color: '#616161',
    fontSize: '1.4rem',
    borderBottom: '1px solid #e0e0e0',
  },

  content: {
    py: 1.5,
    color: '#616161',
    fontSize: '1.3rem',
  },

  btn: {
    background: '#ef5350',
    '&:hover': {
      background: '#d32f2f',
    },
  },
};
export default ModalConfirmRefresh;
