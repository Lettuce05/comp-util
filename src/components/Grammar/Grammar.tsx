import { useContext, useState } from "preact/hooks"
import { AppState } from "../../main"
import { GRAMMAR_INPUT } from "../../types"
import {v4} from 'uuid'
import GrammarInput from "../GrammarInput/GrammarInput"
import {default as grammarClass} from "../../utils/Grammar"
import Modal from "../Modal/Modal"

export default function Grammar() {
  const {grammarInput} = useContext(AppState)
  const [modalState, setModalState] = useState({
    shown: false,
    message: ''
  });

  function handleChange(id: string, e: Event){
    let grammar = [...grammarInput.value];
    const target: HTMLInputElement = e.target as HTMLInputElement;
    grammar = grammar.map((input: GRAMMAR_INPUT) => {
      if (input.id === id && target){
        if (target.name === 'LH'){
          input.LH = target.value;
        } else if (target.name === 'RH'){
          input.RH = target.value;
        }
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

  function handleSave() {
    let grammarProductions = grammarClass.validateGrammar(grammarInput.value)
    if (typeof grammarProductions === 'string'){
      setModalState({
        shown: true,
        message: grammarProductions
      })
    } else {
      console.log(grammarProductions);
    } 
  }

  return (
    <div className='max-h-full overflow-y-auto'>
      <div className='px-2 my-4'>
        <p><span className='font-bold'>Non-Terminal:</span> must match a [A-Z]+ pattern</p>
        <p><span className='font-bold'>Terminal:</span> must match a ".+" pattern</p>
        <p><span className='font-bold'>Epsilon:</span> please use ε for any production that needs epsilon</p>
      </div>
      {grammarInput.value.map((input: GRAMMAR_INPUT)=> <GrammarInput key={input.id} input={input} handleInput={handleChange} handleRemove={handleRemove} />)}
      <button onClick={handleAdd} className='mx-auto block bg-blue-600 py-2 w-56 rounded-lg'>Add</button>
      <button onClick={handleSave} className='mx-auto block bg-blue-600 py-2 w-56 rounded-lg'>Save</button>
      <Modal shown={modalState.shown}>
        <div className='w-4/5 max-w-lg bg-white mx-auto mt-[25%] -translate-y-1/4 p-9 rounded-lg'>
          <p className='font-bold text-2xl'>Error:</p>
          <button className='absolute top-4 right-4' onClick={() => setModalState({shown: false, message: ''})}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-[3px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </button>
          <p className='text-red-600'>{modalState.message}</p>
        </div>
      </Modal>
    </div>
  )
}
