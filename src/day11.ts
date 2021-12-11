export const parse = (input: string): [number[], number] => {
  const rows = input.trim().split('\n')
  return [rows.flatMap((s) => Array.from(s).map(Number)), rows.length]
}

export const step = (octopuses: number[], rowLength: number) => {
  octopuses = octopuses.map((octopus) => (octopus === 9 ? 0 : octopus + 1))

  const queue = octopuses
    .map((octopus, index) => (octopus === 0 ? index : -1))
    .filter((i) => i > -1)

  const addEnergy = (index: number) => {
    if (octopuses[index]) {
      octopuses[index] += 1
    }

    if (octopuses[index] === 10) {
      octopuses[index] = 0
      queue.push(index)
    }
  }

  while (queue.length) {
    const index = queue.pop()!

    const i = Math.floor(index / rowLength)
    const j = index % rowLength

    if (j !== 0) {
      addEnergy(i * rowLength + j - 1)
      addEnergy((i - 1) * rowLength + j - 1)
      addEnergy((i + 1) * rowLength + j - 1)
    }

    if (j + 1 !== rowLength) {
      addEnergy(i * rowLength + j + 1)
      addEnergy((i - 1) * rowLength + j + 1)
      addEnergy((i + 1) * rowLength + j + 1)
    }

    addEnergy((i - 1) * rowLength + j)
    addEnergy((i + 1) * rowLength + j)
  }

  return octopuses
}

export const first = (input: string) => {
  let [octupuses, rowLength] = parse(input)
  let flashes = 0

  for (let index = 0; index < 100; index++) {
    octupuses = step(octupuses, rowLength)
    flashes += octupuses.filter((o) => o === 0).length
  }

  return flashes
}

export const second = (input: string) => {
  let [octupuses, rowLength] = parse(input)
  let index = 0

  while (true) {
    octupuses = step(octupuses, rowLength)
    index++

    if (octupuses.every((o) => o === 0)) {
      return index
    }
  }
}
