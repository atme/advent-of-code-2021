import { first, second } from '../src/day09'

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`

test('day-9-1 first', () => {
  expect(first(input)).toBe(15)
})

test('day-9-1 second', () => {
  expect(second(input)).toBe(1134)
})
