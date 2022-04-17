import { useState, memo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { StyleSheet } from 'types';
import useDebounce from 'hooks/useDebounce';

type Props = {
  id: string;
  name: string;
  onChange: (id: string, value: number) => void;
};

const ItemScore = memo(({ id, name, onChange }: Props) => {
  const [currentScore, setCurrentScore] = useState<number>(0);

  const [handleChange] = useDebounce((value: number) => onChange(id, value));

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.name}>{name}</Typography>
      <Box sx={styles.menu}>
        <RemoveIcon
          sx={styles.icon}
          color='primary'
          onClick={() => {
            setCurrentScore(currentScore - 1);
            handleChange(currentScore - 1);
          }}
        />
        <TextField
          variant='standard'
          sx={styles.input}
          type='number'
          value={currentScore}
          onChange={(event) => {
            setCurrentScore(+event.target.value);
            handleChange(+event.target.value);
          }}
        />
        <AddIcon
          sx={styles.icon}
          color='primary'
          onClick={() => {
            setCurrentScore(currentScore + 1);
            handleChange(currentScore + 1);
          }}
        />
      </Box>
    </Box>
  );
});

const styles: StyleSheet = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1.25,
  },

  name: {
    fontSize: '1.25rem',
    color: '#616161',
    fontWeight: 600,
    flexGrow: 1,
  },

  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    input: {
      textAlign: 'center',
      fontSize: '1.35rem',
    },
    width: '40px',
  },

  icon: {
    my: 0.5,
    mx: 1,
    p: 0.9,
    backgroundColor: '#f1f1f1',
    border: '1.5px solid #e0e0e0',
    borderRadius: '50%',
  },
};

export default ItemScore;
