const parse = (s: string) => s.trim().split('\n')

export const getGammaRate = (s: string) => {
  const codes = parse(s).map((s) => Array.from(s).map((d) => parseInt(d)))
  return codes
    .reduce(
      (acc, code) => acc.map((value, index) => value + code[index]),
      [...codes[0]].fill(0)
    )
    .map((code) => Math.round(code / codes.length))
    .join('')
}

export const getEpsilonRate = (gammaRate: string) =>
  Array.from(gammaRate)
    .map((s) => (s === '1' ? '0' : '1'))
    .join('')

export const first = (s: string) => {
  const gammaRate = getGammaRate(s)
  const epsilonRate = getEpsilonRate(gammaRate)
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

export const getOxygenGeneratorRating = (s: string) => {
  let bits = parse(s)
  let index = 0
  while (bits.length > 2 && index <= bits.length) {
    const [zeroes, ones] = bits.reduce(
      (acc, bit) => {
        const digit = parseInt(bit[index])
        return [acc[0] + Number(!digit), acc[1] + digit]
      },
      [0, 0]
    )

    bits =
      zeroes <= ones
        ? bits.filter((bit) => bit[index] === '1')
        : bits.filter((bit) => bit[index] === '0')
    index++
  }
  return bits.find((bit) => bit[index] === '1') || '0'
}

export const getCO2GeneratorRating = (s: string) => {
  let bits = parse(s)
  let index = 0
  while (bits.length > 2 && index <= bits.length) {
    const [zeroes, ones] = bits.reduce(
      (acc, bit) => {
        const digit = parseInt(bit[index])
        return [acc[0] + Number(!digit), acc[1] + digit]
      },
      [0, 0]
    )

    bits =
      zeroes < ones
        ? bits.filter((bit) => bit[index] === '0')
        : bits.filter((bit) => bit[index] === '1')
    index++
  }
  return bits.find((bit) => bit[index] === '0') || '0'
}

export const second = (s: string) => {
  const oxygen = getOxygenGeneratorRating(s)
  const co2 = getCO2GeneratorRating(s)
  return parseInt(oxygen, 2) * parseInt(co2, 2)
}
