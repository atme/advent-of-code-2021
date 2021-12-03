import { getCO2GeneratorRating, getEpsilonRate, getGammaRate, getOxygenGeneratorRating } from '../src/day03'

const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`

test('day 2-1-1', () => {
  expect(getGammaRate(input)).toBe('10110')
})

test('day 2-1-2', () => {
  expect(getEpsilonRate('10110')).toBe('01001')
})

test('day 2-2-1', () => {
  expect(getOxygenGeneratorRating(input)).toBe('10111')
})

test('day 2-2-2', () => {
  expect(getCO2GeneratorRating(input)).toBe('01010')
})

// test('day 2-2', () => {
//   expect(calcAim(reports)).toBe(900)
// })