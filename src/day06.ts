export const parse = (input: string) => input.trim().split(',')

export const breed = (lanterfishTick: number, days: number) => {
  let fishes: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    [lanterfishTick]: 1,
  }

  while (days > 0) {
    const newFishes = fishes[0]
    fishes[0] = fishes[1]
    fishes[1] = fishes[2]
    fishes[2] = fishes[3]
    fishes[3] = fishes[4]
    fishes[4] = fishes[5]
    fishes[5] = fishes[6]
    fishes[6] = fishes[7] + newFishes
    fishes[7] = fishes[8]
    fishes[8] = newFishes
    days--
  }
  return Object.keys(fishes)
    .map((key) => fishes[parseInt(key)])
    .reduce((a, b) => a + b, 0)
}

export const createDict = (days: number) =>
  Object.fromEntries(
    [1, 2, 3, 4, 5].map((lanterfish) => [lanterfish, breed(lanterfish, days)])
  )

export const first = (input: string) => {
  const dict = createDict(80)
  return parse(input)
    .map((f) => dict[f])
    .reduce((a, b) => a + b, 0)
}

export const second = (input: string) => {
  const dict = createDict(256)
  return parse(input)
    .map((f) => dict[f])
    .reduce((a, b) => a + b, 0)
}
