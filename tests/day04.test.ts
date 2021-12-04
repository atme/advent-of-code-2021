import { findLastWonBoard, first, parseBoard, parse, second } from '../src/day04'

const input = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`

test('day 4-1 parseBoard', () => {
  const [_, board] = input.trim().split('\n\n')
  expect(parseBoard(board)).toEqual({
    '22': { x: 0, y: 0 },
    '13': { x: 1, y: 0 },
    '17': { x: 2, y: 0 },
    '11': { x: 3, y: 0 },
    '0': { x: 4, y: 0 },
    '8': { x: 0, y: 1 },
    '2': { x: 1, y: 1 },
    '23': { x: 2, y: 1 },
    '4': { x: 3, y: 1 },
    '24': { x: 4, y: 1 },
    '21': { x: 0, y: 2 },
    '9': { x: 1, y: 2 },
    '14': { x: 2, y: 2 },
    '16': { x: 3, y: 2 },
    '7': { x: 4, y: 2 },
    '6': { x: 0, y: 3 },
    '10': { x: 1, y: 3 },
    '3': { x: 2, y: 3 },
    '18': { x: 3, y: 3 },
    '5': { x: 4, y: 3 },
    '1': { x: 0, y: 4 },
    '12': { x: 1, y: 4 },
    '20': { x: 2, y: 4 },
    '15': { x: 3, y: 4 },
    '19': { x: 4, y: 4 },
  })
})

test('day 4-1', () => {
  expect(first(input)).toBe(4512)
})

test('day 4-2 findLastWonBoard', () => {
  const { digits, boards } = parse(input)
  const [_, row] =  findLastWonBoard(digits, boards)
  expect(row[row.length - 1]).toBe('13')
})

test('day 4-2', () => {
  expect(second(input)).toBe(1924)
})
