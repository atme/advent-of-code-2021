export const parse = (input: string) =>
  input.split('\n').map((l) => Array.from(l))

const CHUNK: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

export const findCorruptedSymbol = (symbols: string[]) => {
  const queue: string[] = []
  for (const symbol of symbols) {
    if (CHUNK.hasOwnProperty(symbol)) {
      queue.push(symbol)
    } else if (CHUNK[queue.pop()!] !== symbol) {
      return symbol
    }
  }
}

const FIRST_SCORE: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

export const first = (input: string) =>
  parse(input)
    .map(findCorruptedSymbol)
    .filter(Boolean)
    .map((s) => FIRST_SCORE[s!])
    .reduce((a, b) => a + b, 0)

export const complete = (symbols: string[]) => {
  const queue: string[] = []
  for (const symbol of symbols) {
    if (CHUNK.hasOwnProperty(symbol)) {
      queue.push(symbol)
    } else {
      queue.pop()
    }
  }

  return queue.reverse().map((s) => CHUNK[s])
}

const SECOND_SCORE: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

export const second = (input: string) => {
  const scores = parse(input)
    .filter((s) => findCorruptedSymbol(s) === undefined)
    .map((symbols) =>
      complete(symbols)
        .map((symbol) => SECOND_SCORE[symbol])
        .reduce((a, b) => a * 5 + b, 0)
    )
    .sort((a, b) => a - b)

  return scores[Math.floor(scores.length / 2)]
}
