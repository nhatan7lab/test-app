import React from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  id: string;
  name: string;
  score: number;
  round: number;
  onChange: (id: string, round: number, value: number) => void;
  onIncrement: (id: string, round: number) => void;
  onDecrement: (id: string, round: number) => void;
};

const styles: React.CSSProperties = {
  outline: 'none',
  fontSize: '1.3rem',
  border: 0,
  width: '30px',
  textAlign: 'center',
  borderBottom: '1px solid #027cd4',
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
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.25,
      }}
    >
      <Typography fontSize='1.2rem'>{name}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RemoveIcon
          sx={{
            m: 0.5,
            p: 0.3,
            backgroundColor: '#f1f1f1',
            borderRadius: '50%',
          }}
          color='primary'
          onClick={() => onDecrement(id, round)}
        />
        <input
          style={styles}
          type='number'
          value={score}
          onChange={(event) => onChange(id, round, +event.target.value)}
        />
        <AddIcon
          sx={{
            m: 0.5,
            p: 0.3,
            backgroundColor: '#f1f1f1',
            borderRadius: '50%',
          }}
          color='primary'
          onClick={() => onIncrement(id, round)}
        />
      </Box>
    </Box>
  );
};

export default ItemScore;
