import { fold, parse, first, second } from '../src/day13'

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

test('day 13-1-1 fold', () => {
  const { sheet, instructions } = parse(input)
  expect(fold(sheet, instructions[0]).length).toBe(17)
})

test('day 13-1-2 first', () => {
  expect(first(input)).toBe(17)
})

test('day 13-2 second', () => {
  const result = `#####
#...#
#...#
#...#
#####`
  expect(second(input)).toBe(result)
})
