export const parse = (input: string) =>
  input.split('\n').map((s) => parseInt(s.slice(-2)))

const position = (lastPosition: number, steps: number) =>
  (lastPosition + steps) % 10 || 10

export const first = (input: string) => {
  let [player1Position, player2Position] = parse(input)
  let player1Points = 0
  let player2Points = 0
  let rolled = 0

  let dice = 0
  const roll = () => ++dice % 100 || 100

  while (player2Points < 1000) {
    rolled += 3
    player1Position = position(player1Position, roll() + roll() + roll())
    player1Points += player1Position
    if (player1Points >= 1000) {
      break
    }

    rolled += 3
    player2Position = position(player2Position, roll() + roll() + roll())
    player2Points += player2Position
  }

  return Math.min(player1Points, player2Points) * rolled
}

export const second = (input: string) => {
  const positions = parse(input)
  const won = [0, 0]

  let record = {
    [JSON.stringify({ points: [0, 0], positions })]: 1,
  }

  //3 = 111
  //4 = 112 121 211
  //5 = 113 131 311 122 212 221
  //6 = 123 132 213 231 312 321 222
  //7 = 133 313 331 223 232 322
  //8 = 233 323 332
  //9 = 333
  const dices = [
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1],
  ]

  while (Object.keys(record).length > 0) {
    for (const player of [0, 1]) {
      const nextRecord: Record<string, number> = {}

      for (const key in record) {
        const universeCount = record[key]

        for (const [value, universes] of dices) {
          const { points, positions } = JSON.parse(key)
          positions[player] = position(positions[player], value)
          points[player] += positions[player]

          if (points[player] >= 21) {
            won[player] += universes * universeCount
          } else {
            const key = JSON.stringify({ points, positions })
            nextRecord[key] = (nextRecord[key] || 0) + universes * universeCount
          }
        }
      }

      record = nextRecord
    }
  }

  return Math.max(...won)
}
