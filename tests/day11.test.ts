import { first, second } from '../src/day11'

const input = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`

test('day 11-1 first', () => {
  expect(first(input)).toBe(1656)
})

test('day 11-2 second', () => {
  expect(second(input)).toBe(195)
})