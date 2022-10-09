import useClippet, { cPlop, cPlung, cPlip } from 'clippet';

interface Props {

}

export default function Button(props: Props) {
  const [playOnAddTodo] = useClippet(cPlop, {
    volume: 0.5,
    muted: false,
    pitch: 1.2,
  });
  const [playOnHover, { stop: stopPlung }] = useClippet(cPlung);
  const onClick = async () => {
    await addTodo();
    playOnAddTodo();
  };

  return (
    <ClippetProvider config={{
      onFocus: { // other key value pairs!
        clip: cPlip,
        selectors: ['[aria-label=*]', 'button'], // shortcut for accesibility!
      }
    }}>
      <button onClick={onClick} onFocus={playOnFocus} onBlur={playOnBlur} onMouseEnter={playOnHover} onMouseLeave={stopPlung}>
    </ClippetProvider>
    </button>
  );
}
