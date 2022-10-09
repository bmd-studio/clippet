import _useClippet from './hooks/useClippet';
import _useClippetProvider from './hooks/useClippetProvider';
import _ClippetProvider from './context/ClippetProvider';
import plip from './clips/plip';

export const useClippet = _useClippet;
export const useClippetProvider = _useClippetProvider;
export const ClippetProvider = _ClippetProvider;

export const cPlip = plip;
