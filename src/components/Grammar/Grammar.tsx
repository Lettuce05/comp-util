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
    <div>
      {grammarInput.value.map((input: GRAMMAR_INPUT)=> <GrammarInput key={input.id} input={input} handleInput={handleChange} handleRemove={handleRemove} />)}
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}
