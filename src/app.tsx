import { useContext } from 'preact/hooks'
import LL from './components/LL/LL'
import {AppState} from './main'

export function App() {
 const {page} = useContext(AppState);
 
 if (page == 'LL') {
    return (
      <LL />
    )
  }
}
