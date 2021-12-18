export const parse = (input: string) => {
  const regexp = new RegExp('-?[0-9]+', 'g')
  return Array.from(input.matchAll(regexp), (m) => m[0]).map(Number)
}

const reachedYTarget = (velocity: number, max: number, min: number) => {
  const acceleration = -1
  let coordinate = 0
  for (; coordinate + velocity >= max; velocity += acceleration) {
    coordinate += velocity
  }
  return coordinate <= min
}

export const first = (input: string) => {
  const [xMin, xMax, yMax, yMin] = parse(input)
  let y = 1

  const maxVelocity = Math.abs(yMax)

  for (let velocity = 1; velocity <= maxVelocity; velocity++) {
    if (reachedYTarget(velocity, yMax, yMin)) {
      y = velocity
    }
  }

  return (y / 2) * (1 + y)
}

export const second = (input: string) => {
  const [xMin, xMax, yMax, yMin] = parse(input)
  let y: number[] = []
  let x: number[] = []

  const reachedXTarget = (velocity: number, max: number, min: number) => {
    const acceleration = -1
    let coordinate = 0
    for (; velocity > 0; velocity += acceleration) {
      coordinate += velocity
    }

    return coordinate >= min
  }

  for (let velocity = Math.abs(yMax); velocity >= yMax; velocity--) {
    if (reachedYTarget(velocity, yMax, yMin)) {
      y.push(velocity)
    }
  }

  for (let velocity = 1; velocity <= xMax; velocity++) {
    if (reachedXTarget(velocity, xMax, xMin)) {
      x.push(velocity)
    }
  }

  const areValid = (yVelocity: number, xVelocity: number) => {
    const steps = []

    const acceleration = -1
    let coordinate = 0
    let step = 1
    for (; coordinate + yVelocity >= yMax; yVelocity += acceleration) {
      coordinate += yVelocity
      if (coordinate <= yMin) {
        steps.push(step)
      }
      step++
    }

    for (let step of steps) {
      step = Math.min(step, xVelocity)
      const xCoordinate = (step / 2) * (2 * xVelocity - step + 1)
      if (xCoordinate >= xMin && xCoordinate <= xMax) {
        return true
      }
    }

    return false
  }

  return y
    .flatMap((yVelocity) =>
      x.map((xVelocity) => areValid(yVelocity, xVelocity))
    )
    .filter(Boolean).length
}
