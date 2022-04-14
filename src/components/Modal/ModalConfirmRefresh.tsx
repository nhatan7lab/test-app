import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { StyleSheet } from '../../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const ModalConfirmRefresh = ({ isOpen, onClose, onSubmit }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>Confirm</DialogTitle>
      <DialogContent>
        <Typography sx={styles.content}>
          Are you sure to refresh data?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={onSubmit}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles: StyleSheet = {
  title: {
    fontSize: '1.5rem',
  },

  content: {
    fontSize: '1.3rem',
  },
};
export default ModalConfirmRefresh;
