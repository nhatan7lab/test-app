import { useState } from 'react';

export default function useDebounce(
  callback: (...args: any) => any,
  delay: number = 500,
): [(...args: any) => any, boolean] {
  const [timeout, saveTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [isDone, setIsDone] = useState<boolean>(false);

  const debounceCallback = function (...args: any) {
    if (timeout) {
      clearTimeout(timeout);
      setIsDone(false);
    }

    const newTimeout = setTimeout(() => {
      callback(...args);
      setIsDone(true);
      if (newTimeout === timeout) {
        saveTimeout(null);
      }
    }, delay);

    saveTimeout(newTimeout);
  };

  return [debounceCallback, isDone];
}
