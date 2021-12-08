const sortLetters = (letters: string) => letters.split('').sort().join('')
export const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((s) => {
      const [signal, output] = s.split(' | ')
      return {
        signal: signal.split(' ').map(sortLetters),
        output: output.split(' ').map(sortLetters),
      }
    })

export const first = (input: string) => {
  const isSearchedNumber = (s: string) =>
    s.length === 2 || s.length === 3 || s.length === 4 || s.length === 7

  return parse(input)
    .map(({ output }) => output.filter(isSearchedNumber).length)
    .reduce((a, b) => a + b, 0)
}

const has = (bigString: string, smallString: string) =>
  !Array.from(smallString)
    .map((letter) => bigString.includes(letter))
    .includes(false)

export const decipher = (line: string[]) => {
  const one = line.find((letters) => letters.length === 2) || ''
  const four = line.find((letters) => letters.length === 4) || ''
  const seven = line.find((letters) => letters.length === 3) || ''
  const eight = line.find((letters) => letters.length === 7) || ''

  const twoThreeFive = line.filter((letters) => letters.length === 5)
  const three = twoThreeFive.find((letters) => has(letters, one)) || ''

  const zeroSixNine = line.filter((letters) => letters.length === 6)
  const six = zeroSixNine.find((letters) => !has(letters, one)) || ''
  const nine = zeroSixNine.find((letters) => has(letters, three)) || ''
  const zero =
    zeroSixNine.find((letters) => letters !== six && letters !== nine) || ''

  const five = twoThreeFive.find((letters) => has(six, letters)) || ''
  const two =
    twoThreeFive.find((letters) => letters !== three && letters !== five) || ''

  return {
    [zero]: '0',
    [one]: '1',
    [two]: '2',
    [three]: '3',
    [four]: '4',
    [five]: '5',
    [six]: '6',
    [seven]: '7',
    [eight]: '8',
    [nine]: '9',
  }
}

export const second = (input: string) =>
  parse(input)
    .map(({ signal, output }) => {
      const codes = decipher(signal)
      return parseInt(output.map((letters) => codes[letters]).join(''))
    })
    .reduce((a, b) => a + b, 0)
