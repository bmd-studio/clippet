import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useClippet, useClippetObserver } from '@clippet/react';
import { clPlop, clSwish, clGurr, clJitter } from '@clippet/free-sound-font';

export default function PlipButton() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  const [playPlop] = useClippet(clPlop, {
    isMuted: false,
  });

  useClippetObserver(ref, clJitter, {
    movements: {
      enabled: true,
    },
    synchronisation: {
      enabled: true,
      interrupt: false,
    },
  });

  return (
    <motion.button ref={ref} onClick={() => {
      // playPlop();
      setCount((count) => count + 1);
    }} animate={{
      x: (count * count) * 10,
    }} transition={{ duration: (count * count) / 10 }} >
      count is {count}
    </motion.button>
  );
}
