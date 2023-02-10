import { render } from 'preact'
import { createContext } from 'preact'
import { createState } from './state'
import { App } from './app'
import './index.css'

const initialState = createState();

export const AppState = createContext(initialState);

render(
  <AppState.Provider value={initialState}>
    <App />
  </AppState.Provider>, document.getElementById('app') as HTMLElement)
