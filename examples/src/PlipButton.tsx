import { useState } from 'react';
import { useClippet } from '@clippet/react/index';
import cPlop from '@clippet/react/clips/plop';

export default function PlipButton() {
  const [count, setCount] = useState(0);
  const [playPlop] = useClippet(cPlop, {
    isMuted: false,
    volume: 1,
  });

  return (
    <button onClick={() => {
      playPlop();
      setCount((count) => count + 1);
    }}>
      count is {count}
    </button>
  );
}
