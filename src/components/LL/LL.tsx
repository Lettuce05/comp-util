import { useContext } from 'preact/hooks'
import {AppState} from '../../main'

export default function LL() {
  const {page} = useContext(AppState);
  return (
    <div className="">
      <h1 className="text-3xl font-bold underline font-sans">{page}</h1>
    </div>
  )
}
