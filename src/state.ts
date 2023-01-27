import { signal } from "@preact/signals"
import {pages} from './types'
export function createState() {
  const page = signal(pages.FIRST)

  return {page}
}
