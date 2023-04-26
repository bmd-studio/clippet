<div align="left">
  <h1>
    🔊
    <br />
    <a href="https://clippet.dev/" target="_blank">Clippet React</a>
  </h1>
  <sup>
    <a href="https://www.npmjs.com/package/@clippet/react" target="_blank">
       <img src="https://img.shields.io/npm/v/@clippet/react.svg" alt="npm package" />
    </a>
    <!-- <a href="https://circleci.com/gh/bmd-studio/clippet" target="_blank">
      <img src="https://img.shields.io/circleci/project/github/bmd-studio/clippet/master.svg" alt="CircleCI master" />
    </a> -->
    <a href="https://www.npmjs.com/package/@clippet/react" target="_blank">
      <img src="https://img.shields.io/npm/dm/@clippet/react.svg" alt="npm downloads" />
    </a>
    <!-- <a href="http://clippet.dev/examples" target="_blank">
      <img src="https://img.shields.io/badge/demos-🚀🚀-yellow.svg" alt="demos" />
    </a> -->
    <br />
    <h2>⚠️ THIS PACKAGE IS STILL IN ALPHA ⚠️</h2>
    <h3>The font for sounds.</h3>
    <h4>An elegant React library for audio feedback<br/> in user interfaces</h4>
  </sup>
  <pre>npm i <a href="https://www.npmjs.com/package/@clippet/react" target="_blank">@clippet/react</a> <a href="https://www.npmjs.com/package/@clippet/free-sound-font" target="_blank">@clippet/free-sound-font</a></pre>
  <pre>yarn add <a href="https://www.npmjs.com/package/@clippet/react" target="_blank">@clippet/react</a> <a href="https://www.npmjs.com/package/@clippet/free-sound-font" target="_blank">@clippet/free-sound-font</a></pre>
</div>

<div align="left">
  <!-- <h3><a href="https://clippet.dev/docs" target="_blank">Docs</a> - how to use</h3> -->
  <!-- <h3><a href="https://clippet.dev" target="_blank">Get pro</a> - how to upgrade</h3> -->
</div>

### Usage

#### Basic usage
```jsx
import { useClippet } from '@clippet/react';
import { clPlip } from '@clippet/free-sound-font';

export default function Button() {
  const [playClick] = useClippet(clPlip);

  return (
    <button onClick={() => {
      playClick();
    }}>
      Press me!
    </button>
  );
}
```

### Acknowledgments
```Clippet``` is developed and maintained by <a href="https://bmd.studio/" target="_blank">BMD Studio</a>
