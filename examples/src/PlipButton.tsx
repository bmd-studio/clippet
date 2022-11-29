import { useState } from 'react';
import { clPlop, useClippet } from '@clippet/react';

export default function PlipButton() {
  const [count, setCount] = useState(0);
  const [playPlop] = useClippet(clPlop, {
    isMuted: false,
    volume: 0.5,
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
