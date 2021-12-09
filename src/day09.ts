import { merge, remove } from 'lodash'

export const parse = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((line) => Array.from(line).map(Number))

export const first = (input: string) => {
  let lowPoints = []

  const data = parse(input)
  for (let i = 0; i < data.length; i++) {
    const line = data[i]
    for (let j = 0; j < line.length; j++) {
      const digit = line[j]

      if (
        digit >= line[j - 1] ||
        digit >= line[j + 1] ||
        digit >= data[i - 1]?.[j] ||
        digit >= data[i + 1]?.[j]
      ) {
        continue
      }

      lowPoints.push(digit)
    }
  }

  return lowPoints.map((p) => p + 1).reduce((a, b) => a + b, 0)
}

type Basin = { [i: number]: { [j: number]: number } }

export const second = (input: string) => {
  let basins: Basin[] = []

  parse(input)
    .flatMap((line, i) =>
      line
        .map((digit, j) => [[i, j], digit] as [[number, number], number])
        .filter(([_, digit]) => digit < 9)
    )
    .forEach(([[i, j], digit]) => {
      let foundBasin = false

      for (const basin of basins) {
        if (
          basin[i]?.hasOwnProperty(j - 1) ||
          basin[i - 1]?.hasOwnProperty(j)
        ) {
          if (!basin[i]) basin[i] = {}
          basin[i][j] = digit
          foundBasin = true
        }
      }

      if (foundBasin) {
        const unitedBasin = remove(basins, (basin) =>
          basin[i]?.hasOwnProperty(j)
        )

        basins.push(merge(unitedBasin[0], ...unitedBasin))
      } else {
        basins.push({ [i]: { [j]: digit } })
      }
    })

  return basins
    .map(
      (basin) =>
        Object.values(basin).flatMap((line) => Object.values(line)).length
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
}
