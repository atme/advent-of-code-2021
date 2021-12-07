import { memoize, range } from 'lodash'

export const parse = (input: string) =>
  input
    .split(',')
    .map(Number)
    .sort((a, b) => a - b)

export const median = (numbers: number[]) => {
  if (numbers.length % 2 !== 0) {
    return numbers[(numbers.length - 1) / 2]
  }
  const index = numbers.length / 2
  return Math.round((numbers[index] + numbers[index - 1]) / 2)
}

export const first = (input: string) => {
  const positions = parse(input)
  const target = median(positions)
  return positions.map((p) => Math.abs(p - target)).reduce((a, b) => a + b, 0)
}

export const cost = memoize(
  (steps: number): number => (steps / 2) * (steps + 1)
)

export const second = (input: string) => {
  const positions = parse(input)

  return range(positions[0], positions[positions.length - 1])
    .map((target) =>
      positions
        .map((p) => Math.abs(p - target))
        .map(cost)
        .reduce((a, b) => a + b, 0)
    )
    .sort((a, b) => b - a)
    .pop()
}
