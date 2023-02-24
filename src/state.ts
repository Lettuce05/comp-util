import { signal, Signal } from "@preact/signals"
import {v4} from 'uuid'
import {GRAMMAR_INPUT, pages} from './types'
import Grammar from "./utils/Grammar"

export function createState() {
  const page: Signal<string> = signal(pages.FIRST)
  const grammarInput: Signal<GRAMMAR_INPUT[]> = signal([{id: v4(), LH: '', RH: ''}])
  const grammar: Signal<Grammar | null> = signal(null);
  return {page, grammarInput, grammar}
}
