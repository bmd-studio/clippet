<div align="left">
  <h1>
    🔊
    <br />
    <a href="https://clippet.dev/">Clippet React</a>
  </h1>
  <sup>
    <a href="https://www.npmjs.com/package/@clippet/react">
       <img src="https://img.shields.io/npm/v/@clippet/react.svg" alt="npm package" />
    </a>
    <a href="https://circleci.com/gh/bmd-studio/clippet-react">
      <img src="https://img.shields.io/circleci/project/github/bmd-studio/clippet-react/master.svg" alt="CircleCI master" />
    </a>
    <a href="https://www.npmjs.com/package/@clippet/react">
      <img src="https://img.shields.io/npm/dm/@clippet/react.svg" alt="npm downloads" />
    </a>
    <a href="http://clippet.dev/examples">
      <img src="https://img.shields.io/badge/demos-🚀🚀-yellow.svg" alt="demos" />
    </a>
    <br />
    <h3>The font for sounds.</h3>
    <h4>An elegant React library for audio feedback<br/> in user interfaces</h4>
  </sup>
  <pre>npm i <a href="https://www.npmjs.com/package/@clippet/react">@clippet/react</a></pre>
  <pre>yarn add <a href="https://www.npmjs.com/package/@clippet/react">@clippet/react</a></pre>
</div>

<div align="left">
  <h3><a href="https://clippet.dev/docs">Docs</a> - how to use</h3>
  <h3><a href="https://clippet.dev">Get pro</a> - how to upgrade</h3>
</div>

<h4>Basic usage</h4>
```typescript
import { clPlop, useClippet } from '@clippet/react';

export default function Button() {
  const [playPlop] = useClippet(clPlop);

  return (
    <button onClick={() => {
      playPlop();
    }}>
      Play Sound!
    </button>
  );
}
```

