import { invert } from "lodash"

const sortLetters = (letters: string) => Array.from(letters).sort().join('')
export const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((s) => s.split(' | ') as [string, string])
    .map(([signal, output]) => ({
      signal: signal.split(' ').map(sortLetters),
      output: output.split(' ').map(sortLetters),
    }))

export const first = (input: string) => {
  const isSearchedNumber = (s: string) =>
    s.length === 2 || s.length === 3 || s.length === 4 || s.length === 7

  return parse(input)
    .map(({ output }) => output.filter(isSearchedNumber).length)
    .reduce((a, b) => a + b, 0)
}

const has = (bigString: string, smallString: string) =>
  Array.from(smallString).every((l) => bigString.includes(l))

const length = (l: number) => (s: string) => s.length === l
const find = (a: string[], fn: (v: string) => boolean) => a.find(fn) || ''
const not = (a: string, b: string) => (l: string) => l !== a && l !== b

export const decipher = (signal: string[]) => {
  const codes: Record<string, string> = {
    '1': find(signal, length(2)),
    '4': find(signal, length(4)),
    '7': find(signal, length(3)),
    '8': find(signal, length(7)),
  }

  const twoThreeFive = signal.filter(length(5))
  codes['3'] = find(twoThreeFive, (letters) => has(letters, codes['1']))

  const zeroSixNine = signal.filter(length(6))
  codes['6'] = find(zeroSixNine, (letters) => !has(letters, codes['1']))
  codes['9'] = find(zeroSixNine, (letters) => has(letters, codes['3']))
  codes['0'] = find(zeroSixNine, not(codes['6'], codes['9']))

  codes['5'] = find(twoThreeFive, (letters) => has(codes['6'], letters))
  codes['2'] = find(twoThreeFive, not(codes['3'], codes['5']))

  return invert(codes)
}

export const second = (input: string) =>
  parse(input)
    .map(({ signal, output }) => {
      const codes = decipher(signal)
      return parseInt(output.map((letters) => codes[letters]).join(''))
    })
    .reduce((a, b) => a + b, 0)
