import { useContext } from "preact/hooks"
import { AppState } from "../../main"
import { GRAMMAR_INPUT } from "../../types"
import {v4} from 'uuid'
import GrammarInput from "../GrammarInput/GrammarInput"

export default function Grammar() {
  const {grammarInput} = useContext(AppState)

  function handleChange(id: string, e: Event){
    let grammar = [...grammarInput.value];
    grammar = grammar.map((input: GRAMMAR_INPUT) => {
      if (input.id === id){
        input[e.target.name] = e.target.value
      }
      return input
    })

    grammarInput.value = grammar;
  }

  function handleRemove(id: string){
    let grammar = [...grammarInput.value];
    grammar = grammar.filter((input) => input.id !== id);
    grammarInput.value = grammar;
  }

  function handleAdd(){
   const newGrammarInput: GRAMMAR_INPUT = {
      id: v4(),
      LH: '',
      RH: '',
    } 

    grammarInput.value = [...grammarInput.value, newGrammarInput]
  }

  return (
    <div className='max-h-full overflow-y-auto'>
      <div className='px-2 my-4'>
        <p><span className='font-bold'>Non-Terminal:</span> must match a [A-Z]+ pattern</p>
        <p><span className='font-bold'>Terminal:</span> must match a ".+" pattern</p>
      </div>
      {grammarInput.value.map((input: GRAMMAR_INPUT)=> <GrammarInput key={input.id} input={input} handleInput={handleChange} handleRemove={handleRemove} />)}
      <button onClick={handleAdd} className='mx-auto block bg-blue-600 py-2 w-56 rounded-lg'>Add</button>
    </div>
  )
}
