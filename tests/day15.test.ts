import { first, second } from '../src/day15'

const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

test('day 14-1 first', () => {
  expect(first(input)).toBe(40)
})

test('day 14-2 second', () => {
  expect(second(input)).toBe(315)
})