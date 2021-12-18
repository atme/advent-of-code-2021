import { first, second } from '../src/day17'

const input = 'target area: x=20..30, y=-10..-5'

test('day 17 first', () => {
  expect(first(input)).toBe(45)
})

test('day 17 second', () => {
  expect(second(input)).toBe(112)
})
