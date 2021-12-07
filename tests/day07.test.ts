import { cost, first, median, parse, second } from '../src/day07'

const input = '16,1,2,0,4,2,7,1,2,14'

test('day-7-1 median', () => {
  expect(median(parse(input))).toBe(2)
})

test('day-7-1 first', () => {
  expect(first(input)).toBe(37)
})

test('day-7-2 cost', () => {
  expect(cost(11)).toBe(66)
})

test('day-7-2 second', () => {
  expect(second(input)).toBe(168)
})
