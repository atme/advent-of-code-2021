type Point = { x: number; y: number }
type Line = { start: Point; end: Point }
type FilledLine = string[]

const parsePoint = (p: string) => {
  const [x, y] = p.split(',')
  return { x: parseInt(x), y: parseInt(y) }
}

const parseLine = (s: string) => {
  const [start, end] = s.split(' -> ').map(parsePoint)
  return { start, end }
}

export const parse = (input: string) => input.trim().split('\n').map(parseLine)

export const fillLine = (line: Line) => {
  const result: FilledLine = []

  const xSign = Math.sign(line.end.x - line.start.x)
  const ySign = Math.sign(line.end.y - line.start.y)

  let x = line.end.x + xSign
  let y = line.end.y + ySign

  while (x !== line.start.x || y !== line.start.y) {
    x = x !== line.start.x ? x - xSign : x
    y = y !== line.start.y ? y - ySign : y

    result.push(`${x}-${y}`)
  }

  return result
}

export const findIntersectionsBetweenLines = (l1: FilledLine, l2: FilledLine) =>
  l1.filter((point) => l2.includes(point))

export const findIntersections = (lines: FilledLine[]) => {
  const intersections: FilledLine = []
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      intersections.push(...findIntersectionsBetweenLines(lines[i], lines[j]))
    }
  }

  return new Set(intersections)
}

export const first = (input: string) => {
  const lines = parse(input)
    .filter(({ start, end }) => start.x === end.x || start.y === end.y)
    .map(fillLine)
  return findIntersections(lines).size
}

export const second = (input: string) => {
  const lines = parse(input).map(fillLine)
  return findIntersections(lines).size
}
