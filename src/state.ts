import { signal } from "@preact/signals"
import {v4} from 'uuid'
import {GRAMMAR_INPUT, pages} from './types'


export function createState() {
  const page = signal(pages.FIRST)
  const grammarInput: GRAMMAR_INPUT[] = signal([{id: v4(), LH: '', RH: ''}])
  return {page, grammarInput}
}
