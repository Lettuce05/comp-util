import { useContext } from 'preact/hooks'
import LL from './components/LL/LL'
import First from './components/First/First'
import {AppState} from './main'
import {pages} from './types'

export function App() {
 const {page} = useContext(AppState);
 
 if (page == pages.FIRST) {
    return (
      <First />
    )
  } else if(page == pages.LL) {
    return (
      <LL />
    )
  }
}
