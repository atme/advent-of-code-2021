const parse = (s: string) => s.split('\n').map((s) => parseInt(s))

export const countIncreases = (s: string) =>
  parse(s).filter((value, index, array) => value > array[index - 1]).length

exports.first = countIncreases

export const countMeasurementIncreases = (s: string) => {
  let counter = 0
  let prevNumber = Number.POSITIVE_INFINITY
  const numbers = parse(s)
  for (let i = 2; i < numbers.length; i++) {
    const number = numbers[i] + numbers[i - 1] + numbers[i - 2]
    if (number > prevNumber) {
      counter++
    }
    prevNumber = number
  }
  return counter
}

exports.second = countMeasurementIncreases
