import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import PlipButton from './PlipButton';
// import { ClippetProvider, clPlip } from '@clippet/react';

function App() {
  const [sliderVolume, setSliderVolume] = useState(50);
  const minSliderVolume = 0;
  const maxSliderVolume = 100;
  const volume = sliderVolume / maxSliderVolume;

  return (
    // <ClippetProvider options={{
    //   volume,
    //   windowEvents: [{
    //     eventTypes: ['click'],
    //     selectors: ['button', 'a.nav-link', 'input[type="checkbox"]'],
    //     clippet: clPlip,
    //   }, {
    //     eventTypes: ['mouseenter'],
    //     selectors: ['div'],
    //     clippet: clPlip,
    //   }]
    // }}>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <input
          type="range"
          min={minSliderVolume}
          max={maxSliderVolume}
          value={sliderVolume}
          onChange={(event) => {
            setSliderVolume(parseInt(event.target.value));
          }}
        />
        <div className="card">
          {(new Array(100).fill(0)).map((_value, index) => {
            return (
              <PlipButton key={index}  />
            );
          })}
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    // </ClippetProvider>
  )
}

export default App
