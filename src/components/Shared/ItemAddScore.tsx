import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyleSheet } from '../../types';

type Props = {
  id: string;
  name: string;
  score: number;
  round: number;
  onChange: (id: string, round: number, value: number) => void;
  onIncrement: (id: string, round: number) => void;
  onDecrement: (id: string, round: number) => void;
};

const ItemScore = ({
  id,
  name,
  score,
  round,
  onIncrement,
  onDecrement,
  onChange,
}: Props) => {
  const [currentScore, setCurrentScore] = useState<number>(score);

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.name}>{name}</Typography>
      <Box sx={styles.menu}>
        <RemoveIcon
          sx={styles.icon}
          color='primary'
          onClick={(event) => {
            setCurrentScore(currentScore - 1);
            onDecrement(id, round);
          }}
        />
        <input
          style={styles.input}
          type='number'
          value={currentScore}
          onChange={(event) => {
            onChange(id, round, +event.target.value);
            setCurrentScore(+event.target.value);
          }}
        />
        <AddIcon
          sx={styles.icon}
          color='primary'
          onClick={(event) => {
            setCurrentScore(currentScore + 1);
            onIncrement(id, round);
          }}
        />
      </Box>
    </Box>
  );
};

const styles: StyleSheet = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1.25,
  },

  name: {
    fontSize: '1.25rem',
    flexGrow: 1,
  },

  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    outline: 'none',
    fontSize: '1.3rem',
    border: 0,
    width: '30px',
    textAlign: 'center',
    borderBottom: '1px solid #027cd4',
  },

  icon: {
    m: 0.5,
    p: 0.3,
    backgroundColor: '#f1f1f1',
    borderRadius: '50%',
  },
};

export default ItemScore;
