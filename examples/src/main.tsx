import { ClippetProvider } from '@clippet/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ClippetProvider options={{
      volume: 0.5,
    }}>
      <App />
    </ClippetProvider>
  </React.StrictMode>
)
