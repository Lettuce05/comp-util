import { useContext } from 'preact/hooks'
import {AppState} from '../../main'
import Grammar from '../Grammar/Grammar';
import Table from '../Table/Table';

export default function First() {
  const {grammar} = useContext(AppState);
  const tableHeaders = ['Non-Terminal', 'FIRST(X)']
  let tableData = null;
  if (grammar.value !== null){
    // get first set
    grammar.value.getFirsts()
    tableData = Array.from(grammar.value.firsts).map(set => {
      return [set[0], `{${Array.from(set[1]).sort().join(' , ')}}`]
    })
    console.log(tableData);
    // get follow set
    // get predict set
  }
  return (
    <div className="flex flex-1 max-h-[calc(100vh-56px)]">
      <Grammar />
      <div className='flex-1'>
        {grammar.value && tableData ? <Table headers={tableHeaders} rows={tableData} /> : null}
      </div>
    </div>
  )
}
