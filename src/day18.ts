export type Pair = [number | Pair, number | Pair]
type Token = { type: string; value: string }

const lexicalAnalysis = (s: string) =>
  Array.from(s).map((value) => {
    switch (value) {
      case '[':
        return { type: 'Punctuator', value }
      case ']':
        return { type: 'Punctuator', value }
      case ',':
        return { type: 'Punctuator', value }
      default:
        return { type: 'Number', value }
    }
  })

const syntaxAnalysis = (tokens: Token[]) => {
  let index = 0

  const comma = (): Pair => {
    const left = number()
    if (tokens[index]?.value === ',') {
      index++
      const pair = [left, number()] as Pair
      index++
      return pair
    }
    return left as Pair
  }

  const number = (): number | Pair => {
    const left = leftBrecket()
    if (tokens[index]?.type === 'Number') {
      const number = parseInt(tokens[index].value)
      index++
      return number
    }
    return left
  }

  const leftBrecket = (): Pair => {
    if (tokens[index]?.value === '[') {
      index++
      return comma()
    }
    return [0, 0]
  }

  return comma()
}

export const parse = (input: string) =>
  input.trim().split('\n').map(lexicalAnalysis).map(syntaxAnalysis)

export const explode = (snailfish: Pair) => {
  let nested = 0
  let exploded = false
  let left = 0
  let right = 0
  let explodedIndex = 0

  const exec = (pair: Pair): Pair => {
    nested++
    let l = value(pair[0], _explode)
    if (typeof pair[0] === 'number' && !exploded) {
      explodedIndex++
    }
    let r = value(pair[1], _explode)
    if (typeof pair[1] === 'number' && !exploded) {
      explodedIndex++
    }
    nested--
    return [l, r]
  }

  const value = (value: number | Pair, fn: (pair: Pair) => Pair | number) =>
    typeof value === 'number' ? value : fn(value)

  const _explode = (pair: Pair) => {
    if (nested === 4 && !exploded) {
      left = pair[0] as number
      right = pair[1] as number
      exploded = true
      return 0
    }
    return exec(pair)
  }

  snailfish = exec(snailfish)

  let index = -1
  const addValues = (pair: Pair): Pair => {
    let l = value(pair[0], addValues)
    if (typeof l === 'number') {
      index++
      if (index === explodedIndex - 1) {
        l += left
      }
      if (index === explodedIndex + 1) {
        l += right
      }
    }

    let r = value(pair[1], addValues)
    if (typeof r === 'number') {
      index++
      if (index === explodedIndex - 1) {
        r += left
      }
      if (index === explodedIndex + 1) {
        r += right
      }
    }
    return [l, r]
  }

  return addValues(snailfish)
}

export const split = (snailfish: Pair) => {
  let splitted = false

  const exec = (pair: Pair): Pair => [value(pair[0]), value(pair[1])]

  const value = (value: number | Pair): number | Pair =>
    typeof value === 'number' ? number(value) : exec(value)

  const number = (value: number): number | Pair => {
    if (!splitted && value > 9) {
      splitted = true
      return [Math.floor(value / 2), Math.ceil(value / 2)]
    } else {
      return value
    }
  }

  return exec(snailfish)
}

export const magnitude = (snailfish: Pair) => {
  const sum = (pair: Pair): number => number(pair[0]) * 3 + number(pair[1]) * 2

  const number = (value: number | Pair) =>
    typeof value === 'number' ? value : sum(value)

  return sum(snailfish)
}

export const sum = (snailfish1: Pair, snailfish2: Pair) => {
  let snailfish = [snailfish1, snailfish2] as Pair
  while (true) {
    const exploded = explode(snailfish)
    if (exploded.toString() !== snailfish.toString()) {
      snailfish = exploded
      continue
    }
    const splitted = split(snailfish)
    if (splitted.toString() !== snailfish.toString()) {
      snailfish = splitted
      continue
    }
    return snailfish
  }
}

export const first = (input: string) => magnitude(parse(input).reduce(sum))

export const second = (input: string) =>
  parse(input)
    .flatMap((snailfish, _, array) =>
      array
        .filter((s) => s !== snailfish)
        .flatMap((s) => [sum(s, snailfish), sum(snailfish, s)])
    )
    .map(magnitude)
    .sort((a, b) => a - b)
    .pop()
