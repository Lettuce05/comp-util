import { useContext } from 'preact/hooks'
import {AppState} from '../../main'
import Grammar from '../Grammar/Grammar';

export default function First() {
  const {grammar} = useContext(AppState);

  if (grammar.value !== null){
    // get first set
    grammar.value.getFirsts()
    console.log(grammar.value.firsts)
    // get follow set
    // get predict set
  }
  return (
    <div className="flex flex-1 max-h-[calc(100vh-56px)]">
      <Grammar />
    </div>
  )
}
