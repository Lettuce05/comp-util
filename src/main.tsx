import { render } from 'preact'
import { createContext } from 'preact'
import { createState } from './state'
import { App } from './app'
import './index.css'

export const AppState = createContext();

render(
  <AppState.Provider value={createState()}>
    <App />
  </AppState.Provider>, document.getElementById('app') as HTMLElement)
