import { useContext } from 'preact/hooks'
import {AppState} from '../../main'
import Grammar from '../Grammar/Grammar';

export default function First() {
  const {page} = useContext(AppState);
  return (
    <div className="flex flex-1 max-h-[calc(100vh-56px)]">
      <Grammar />
    </div>
  )
}
