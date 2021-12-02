import { calcAim, calcPosition } from '../src/day02'

const reports = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`

test('day 2-1', () => {
  expect(calcPosition(reports)).toBe(150)
})

test('day 2-2', () => {
  expect(calcAim(reports)).toBe(900)
})