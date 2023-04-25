import { useState } from 'react';
import { useClippet } from '@clippet/react';
import { clPlip } from '@clippet/free-sound-font';

export default function PlipButton() {
  const [count, setCount] = useState(0);
  const [playPlop] = useClippet(clPlip, {
    isMuted: false,
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
