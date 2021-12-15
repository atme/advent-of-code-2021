export const parse = (input: string): [number[], number] => {
  const rows = input.trim().split('\n')
  return [rows.flatMap((s) => Array.from(s).map(Number)), rows.length]
}

export const findCost = (riskLevel: number[], rowLength: number) => {
  const goal = riskLevel.length - 1

  const queue = [0]
  const cost: Record<number, number> = { 0: 0 }

  const neighbors = (index: number) => {
    const i = Math.floor(index / rowLength)
    const j = index % rowLength
    return [
      j > 0 ? i * rowLength + j - 1 : 0,
      j + 1 < rowLength ? i * rowLength + j + 1 : 0,
      i > 0 ? (i - 1) * rowLength + j : 0,
      i + 1 < riskLevel.length / rowLength ? (i + 1) * rowLength + j : 0,
    ].filter(Boolean)
  }

  while (queue.length > 0) {
    const current = queue.sort((a, b) => cost[b] - cost[a]).pop()!

    if (current === goal) {
      break
    }

    for (const next of neighbors(current)) {
      const newCost = (cost[current] || 0) + riskLevel[next]
      if (!(next in cost) || newCost < cost[next]) {
        cost[next] = newCost
        queue.push(next)
      }
    }
  }

  return cost[goal]
}

export const first = (input: string) => {
  const [riskLevel, rowLength] = parse(input)
  return findCost(riskLevel, rowLength)
}

const tile = (input: string) => {
  const tiles = input
    .trim()
    .split('\n')
    .map((s) => Array.from(s).map(Number))

  let result = ''
  for (let i = 0; i < 5 * tiles.length; i++) {
    for (let j = 0; j < 5 * tiles[0].length; j++) {
      const row = i % tiles.length
      const column = j % tiles[0].length
      const offset =
        Math.floor(i / tiles.length) + Math.floor(j / tiles[0].length)
      const number = tiles[row][column] + offset
      result += ((number % 10) + Math.floor(number / 10)).toString()
    }
    result += '\n'
  }
  return result.trim()
}

export const second = (input: string) => {
  const [riskLevel, rowLength] = parse(tile(input))
  return findCost(riskLevel, rowLength)
}
