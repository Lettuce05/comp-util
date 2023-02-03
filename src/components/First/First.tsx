import { useContext } from 'preact/hooks'
import {AppState} from '../../main'
import Grammar from '../Grammar/Grammar';

export default function First() {
  const {page} = useContext(AppState);
  return (
    <div className="flex flex-1">
      <h1 className="text-3xl font-bold underline font-sans">{page}</h1>
      <Grammar />
    </div>
  )
}
