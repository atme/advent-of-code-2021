import { first, breed, second } from '../src/day06'

const input = '3,4,3,1,2'

test('day-6-1-1 predictCreatedLanternfish', () => {
  expect(breed(3, 11)).toBe(3)
})

test('day-6-1-1 predictCreatedLanternfish', () => {
  expect(breed(1, 18)).toBe(7)
})

test('day-6-1 first', () => {
  expect(first(input)).toBe(5934)
})

test('day-6-1 second', () => {
  expect(second(input)).toBe(26984457539)
})