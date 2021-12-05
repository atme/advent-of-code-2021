import { first, second } from '../src/day05'

const input = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

test('day-5-1 first', () => {
  expect(first(input)).toBe(5)
})

test('day-5-2 second', () => {
  expect(second(input)).toBe(12)
})
