import { signal, Signal } from "@preact/signals"
import {v4} from 'uuid'
import {GRAMMAR_INPUT, pages} from './types'


export function createState() {
  const page: Signal<string> = signal(pages.FIRST)
  const grammarInput: Signal<GRAMMAR_INPUT[]> = signal([{id: v4(), LH: '', RH: ''}])
  return {page, grammarInput}
}
