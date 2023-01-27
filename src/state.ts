import { signal } from "@preact/signals"

export function createState() {
  const page = signal("LL")

  return {page}
}
