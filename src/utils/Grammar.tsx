export default class Grammar {
  static TERMINAL_PATTERN = /^".+"$/
  static NONTERMINAL_PATTERN = /^[A-Z]+$/
  static EPSILON = "\u03B5"

  static isProduction(production: string): boolean {
    let productions = production.trim().split(' ').filter(term => term)
    // a production must include at least one NONTERMINAL, TERMINAL, or EPSILON
    if (productions.length < 1) {
      return false;
    }
    // epsilon must be alone in a production
    if (productions.includes(Grammar.EPSILON) && productions.length > 1) {
      return false;
    }
    return productions.every(term => Grammar.isNonTerminal(term.trim()) || Grammar.isTerminal(term.trim()) || term.trim() === Grammar.EPSILON);
  }

  static isTerminal(term: string): boolean {
    return Grammar.TERMINAL_PATTERN.test(term)
  }

  static isNonTerminal(term: string): boolean {
    return Grammar.NONTERMINAL_PATTERN.test(term)
  }

  terminals: string[] = []
  nonterminals: string[] = []
  productions: Production[] = []
}

class Production {
  LH: string
  RH: string

  constructor(lh: string, rh: string){
    this.LH = lh
    this.RH = rh
  }
}
