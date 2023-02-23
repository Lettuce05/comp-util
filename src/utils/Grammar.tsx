import { GRAMMAR_INPUT } from "../types";

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

  static validRH(rh: string) {
    return rh.trim().split('|').every((production)=> Grammar.isProduction(production));
  }

  static validateGrammar(rules: GRAMMAR_INPUT[]) {
    let productions: Map<string, Set<string>> = new Map();
    let usedNonTerminals: Set<string> = new Set(); 
    let usedTerminals: Set<string> = new Set();
    // iterate through rules
    for (const [index, rule] of rules.entries()) {
      // make sure that LH is not empty
      if (!rule.LH.trim()) {
        return `Rule ${index+1}: Left Hand Side must not be empty`;
      }
      // make sure that RH is not empty
      if (!rule.RH.trim()) {
        return `Rule ${index+1}: Right Hand Side must not be empty`;
      }
      // make sure that LH is a NonTerminal
      if (!Grammar.isNonTerminal(rule.LH.trim())) {
        return `Rule ${index+1}: Left Hand Side must match a [A-Z]+ pattern`;
      }
      let rhProductions = rule.RH.trim().split('|');
      for (const production of rhProductions) {
        // Check each term in production, collect non-terminals and terminals, and give a specific error for empty production and invalid term
        let terms = production.trim().split(' ').filter(term => term)

        if (terms.length < 1) {
          return `Rule ${index+1}: There must be no empty Right Hand Sides`;
        }

        for (const term of terms) {
          if (Grammar.isNonTerminal(term.trim())) {
            usedNonTerminals.add(term.trim());
          } else if (Grammar.isTerminal(term.trim())){
            usedTerminals.add(term.trim());
          } else if (term === Grammar.EPSILON && terms.length > 1) {
            return `Rule ${index+1}: Epsilon must be by itself if used in a Right Hand Side`;
          } else {
            return `Rule ${index+1}: Right Hand Side '${production}' does not match (Non-Terminal|Terminal)+|Epsilon pattern`
          }
        }
  
        // check if the current LH is already in productions
        if (productions.has(rule.LH.trim())){
          // get the productions for the LH and add the current production to the Set
          let currProductions: Set<string> = productions.get(rule.LH.trim()) || new Set();
          currProductions.add(production.trim())
          productions.set(rule.LH.trim(), currProductions);
        } else {
          // create a new entry for the LH with the current production as its initial production
          let newProductions: Set<string> = new Set();
          newProductions.add(production.trim());
          productions.set(rule.LH.trim(), newProductions)
        }
      } // end of for loop iterating over rhProductions

    } // end of for loop iterating over rules
    
    // Check if Non-Terminal was used but not defined
    const undefinedNonTerminals = new Set([...usedNonTerminals].filter((x) => !productions.has(x)));
    if (undefinedNonTerminals.size > 0){
      return `The following Non-Terminals are used without being defined: ${Array.from(undefinedNonTerminals).join(',')}`;
    }
    // Grammar is valid so return a new Grammar object
    return new Grammar(usedTerminals, new Set(productions.keys()), productions);

  } // end of validateGrammar()

  terminals: Set<string>
  nonterminals: Set<string>
  productions: Map<string, Set<string>>

  constructor(terminals: Set<string>, nonterminals: Set<string>, productions: Map<string, Set<string>>){
    this.terminals = terminals;
    this.nonterminals = nonterminals;
    this.productions = productions;
  }
}

