import {AppState} from '../../main'
import { useContext, useState } from 'preact/hooks';
import {pages} from '../../types'
export default function Select() {
    const {page} = useContext(AppState);
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" onClick={()=>setOpen(!open)}>
            <div 
                className={`relative w-60 bg-zinc-300 mr-10 py-2 px-2 cursor-pointer after:absolute after:content-[''] after:top-3.5 after:right-2.5 after:w-0 after:h-0 after:border-[6px] after:border-solid after:border-transparent ${open ? 'after:border-t-white' : 'after:border-l-white'}`}
            >
                {page}
            </div>
            <div className={`h-40 w-60 bg-zinc-200 overflow-y-auto absolute ${open ? '': 'hidden'}`}>
                {Object.values(pages).map((page) => <SelectItem value={page} />)}
            </div>
        </div>
    )
}

function SelectItem({value}) {
    const {page} = useContext(AppState);
    return (
        <div className="w-60 bg-zinc-200 mr-10 py-2 px-2 cursor-pointer hover:bg-zinc-400"
            onClick={() => page.value = value}
        >
            {value}
        </div>
    )
}