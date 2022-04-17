import { useRef, useEffect, memo, ChangeEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

import useDebounce from 'hooks/useDebounce';
import { StyleSheet } from 'types';

type Props = {
  onSetName: (id: string, name: string) => void;
} & TextFieldProps;

const ItemAddPlayer = memo(({ onSetName, ...props }: Props) => {
  const [handleSetName] = useDebounce((id: string, name: string) =>
    onSetName(id, name),
  );

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [props.autoFocus]);

  return (
    <TextField
      {...props}
      sx={styles.input}
      inputRef={ref}
      onChange={(
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        handleSetName(event.target.name, event.target.value);
      }}
    />
  );
});

const styles: StyleSheet = {
  input: {
    my: 1,
  },
};

export default ItemAddPlayer;
