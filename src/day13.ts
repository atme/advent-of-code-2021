import { range } from 'lodash'

type Sheet = { x: number; y: number }[]
type Instruction = ['x' | 'y', number]

export const parse = (input: string) => {
  let [dots, instructions] = input.trim().split('\n\n')

  return {
    sheet: dots.split('\n').map((s) => {
      const [x, y] = s.split(',').map(Number)
      return { x, y }
    }) as Sheet,

    instructions: instructions.split('\n').map((s) => {
      const [instruction, coordinate] = s.split('=')
      return [instruction.slice(-1), Number(coordinate)] as Instruction
    }),
  }
}

export const fold = (sheet: Sheet, instruction: Instruction) => {
  const [axis, coordinate] = instruction
  const doubleCoordinate = coordinate * 2
  const foldedDots = sheet
    .filter((dot) => dot[axis] > coordinate)
    .map((dot) => ({ ...dot, [axis]: doubleCoordinate - dot[axis] }))

  return [
    ...sheet.filter((dot) => dot[axis] < coordinate),
    ...foldedDots,
  ].filter(
    (dot, index, dots) =>
      dots.findIndex(({ x, y }) => dot.x === x && dot.y === y) === index
  )
}

export const first = (input: string) => {
  const { sheet, instructions } = parse(input)
  return fold(sheet, instructions[0]).length
}

const draw = (sheet: Sheet) => {
  const maxX = Math.max(...sheet.map((dot) => dot.x)) + 1
  const maxY = Math.max(...sheet.map((dot) => dot.y)) + 1

  const canvas = range(maxY).map((_) => range(maxX).fill(0))
  sheet.forEach(({ x, y }) => {
    canvas[y][x] = 1
  })

  return canvas
    .map((line) => line.map((dot) => (dot === 1 ? '#' : '.')).join(''))
    .join('\n')
}

export const second = (input: string) => {
  const { sheet, instructions } = parse(input)
  const finalSheet = instructions.reduce(
    (dots, instruction) => fold(dots, instruction),
    sheet
  )

  return draw(finalSheet)
}
