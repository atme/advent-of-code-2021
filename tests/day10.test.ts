import { complete, findCorruptedSymbol, first, parse, second } from '../src/day10'

const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
[[<[([]))<([[{}[[()]]]
(((({<>}<{<{<>}{[]{[]{}
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

test('day-10-1 findCorruptedSymbol', () => {
  const data = parse(input)
  expect(findCorruptedSymbol(data[2])).toBe('}')
})

test('day-10-1 first', () => {
  expect(first(input)).toBe(26397)
})

test('day-10-2 complete', () => {
  const data = parse(input)
  expect(complete(data[0]).join('')).toBe('}}]])})]')
})

test('day-10-2 second', () => {
  expect(second(input)).toBe(288957)
})
