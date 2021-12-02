const parse = (s: string) =>
  s.split('\n').map((s) => {
    const [direction, distance] = s.split(' ')
    return [direction, parseInt(distance)] as [string, number]
  })

export const calcPosition = (s: string) => {
  let horizontalPosition = 0
  let depth = 0
  parse(s).forEach(([direction, distance]) => {
    switch (direction) {
      case 'forward':
        horizontalPosition += distance
        break
      case 'down':
        depth += distance
        break
      case 'up':
        depth -= distance
    }
  })
  return horizontalPosition * depth
}

exports.first = calcPosition

export const calcAim = (s: string) => {
  let horizontalPosition = 0
  let depth = 0
  let aim = 0
  parse(s).forEach(([direction, distance]) => {
    switch (direction) {
      case 'forward':
        horizontalPosition += distance
        depth += aim * distance
        break
      case 'down':
        aim += distance
        break
      case 'up':
        aim -= distance
    }
  })
  return horizontalPosition * depth
}

exports.second = calcAim
