import { useContext } from 'react';

import ClippetContext from '../context/ClippetContext';

/*
  Wrapper around context provider deconstruct it's content:
  const { volume, setVolume, isMuted, toggleIsMuted } = useClippetProvider();
*/
export default function useClippetProvider() {
  return useContext(ClippetContext);
}
