import { first, LiteralValue, Operator, parse, second } from '../src/day16'

test('day 16-1-1', () => {
  const literalValue = parse('D2FE28') as LiteralValue
  expect(literalValue.value).toBe(2021)
})

test('day 16-1-2', () => {
  const operator = parse('38006F45291200') as Operator
  expect(operator.subpackets.length).toBe(2)
})

test('day 16-1-3', () => {
  const operator = parse('EE00D40C823060') as Operator
  expect(operator.subpackets.length).toBe(3)
})

test('day 16-1 first', () => {
  expect(first('8A004A801A8002F478')).toBe(16)
})

test('day 16-1 second', () => {
  expect(second('9C0141080250320F1802104A08')).toBe(1)
})