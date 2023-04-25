<div align="left">
  <h1>
    <a href="https://clippet.dev/" target="_blank">Clippet</a>
  </h1>
  <sup>
    <h3>The font for sounds.</h3>
    <h4>An elegant ecosystem for audio feedback in user interfaces</h4>
  </sup>
</div>

### Introduction
This is the mono-repository for the Clippet ecosystem consisting of the various `web libraries`, `example projects` and `sound fonts`.

### Packages
| Name | Path | Published | Description                  |
|------|------|-----------|------------------------------|
| `@clippet/react` | [packages/libraries/react](./packages/libraries/react)| [NPM](https://www.npmjs.com/package/@clippet/react) | Library for [React](https://react.dev/) |
| `@clippet/free-sound-font` | [packages/fonts/free](./packages/fonts/free)| [NPM](https://www.npmjs.com/package/@clippet/free-sound-font) | Free sound font for public use |
| `@clippet/cra` | [packages/examples/cra](./packages/examples/cra)| N/A |Integration in [Create React App](https://create-react-app.dev/) for example and testing purposes |
| `@clippet/nextjs` | [packages/examples/nextjs](./packages/examples/nextjs)| N/A |Integration in [NextJS](https://nextjs.org/) for example and testing purposes |
| `@clippet/vite` | [packages/examples/vite](./packages/examples/vite)| N/A |Integration in [Vite](https://vitejs.dev/) for example and testing purposes |

### Development environment

#### Setting up
After cloning the repository execute the following command:
```
npm run setup
```

This installs all dependencies in all `packages` of the mono-repo and performs the initial build to verify whether everything is valid.

#### Running in development
To start the compilation of all libraries and sound fonts along with the booting of all the example projects for testing run the following command:
```
npm run start
```

Everything is booted up in parallel in the same `shell`. The example projects are available on the following URLs:
| Name | Path|
|--------|-------|
| CRA (NOT WORKING YET) | [http://localhost:5501/](http://localhost:5501/) |
| NextJS | [http://localhost:5502/](http://localhost:5502/) |
| Vite | [http://localhost:5503/](http://localhost:5503/) |

### Publishing

#### Publishing to NPM
It is recommended to open a `shell` in the directory of the `package` you want to publish and execute the following command to test whether the builds and tests are valid:
```
npm run publish:dry
```

When this is all good you can publish the `package` to NPM using:
```
npm run publish:npm
```

### Roadmap
- Q2 2023: first sound font consisting between 12 and 16 sounds
- Q2 2023: landing page for package
- Q3 2023: in-depth documentation
- Q3 2023: playground to test sounds with UX patterns
- Q3 2023: release of multiple sound fonts

### Acknowledgments
```Clippet``` is developed and maintained by <a href="https://bmd.studio/" target="_blank">BMD Studio</a>
