import { first, second } from '../src/day21'

const input = `Player 1 starting position: 4
Player 2 starting position: 8`

test('day 21 first', () => {
  expect(first(input)).toBe(739785)
})

test('day 21 second', () => {
  expect(second(input)).toBe(444356092776315)
})