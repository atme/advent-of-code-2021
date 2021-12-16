export type LiteralValue = {
  version: number
  typeID: 4
  value: number
}

export type Operator = {
  version: number
  typeID: number
  subpackets: Packet[]
}

type Packet = LiteralValue | Operator

const binary = (arr: string[]) => parseInt(arr.join(''), 2)

const parseLiteralValue = (version: number, packet: string[]): LiteralValue => {
  let loop = true
  let value = []

  while (loop) {
    loop = packet.splice(0, 1).pop() === '1'
    value.push(packet.splice(0, 4))
  }

  return {
    version,
    typeID: 4,
    value: binary(value.flat()),
  }
}

const parseOperator = (
  version: number,
  typeID: number,
  packet: string[]
): Operator => {
  const lengthTypeID = packet.splice(0, 1).pop()
  const subpackets: Packet[] = []

  if (lengthTypeID === '0') {
    const subpacketsLength = binary(packet.splice(0, 15))
    const _subpackets = packet.splice(0, subpacketsLength)
    while (_subpackets.length > 0) {
      subpackets.push(parsePacket(_subpackets))
    }
  } else {
    const numberOfSubpackets = binary(packet.splice(0, 11))
    for (let index = 0; index < numberOfSubpackets; index++) {
      subpackets.push(parsePacket(packet))
    }
  }

  return { version, typeID, subpackets }
}

const parsePacket = (packet: string[]) => {
  const version = binary(packet.splice(0, 3))
  const typeID = binary(packet.splice(0, 3))
  return typeID === 4
    ? parseLiteralValue(version, packet)
    : parseOperator(version, typeID, packet)
}

export const parse = (input: string) => {
  const packet = Array.from(input).flatMap((d) =>
    parseInt(d, 16).toString(2).padStart(4, '0').split('')
  )
  return parsePacket(packet)
}

export const first = (input: string) => {
  let versions = 0
  const queue = [parse(input)]

  while (queue.length > 0) {
    const packet = queue.pop()!
    versions += packet.version
    if ('subpackets' in packet) {
      packet.subpackets.forEach((p) => queue.push(p))
    }
  }

  return versions
}

const calc = (packet: Packet): number => {
  if ('value' in packet) {
    return packet.value
  }

  switch (packet.typeID) {
    case 0:
      return packet.subpackets.map(calc).reduce((a, b) => a + b, 0)
    case 1:
      return packet.subpackets.map(calc).reduce((a, b) => a * b, 1)
    case 2:
      return Math.min(...packet.subpackets.map(calc))
    case 3:
      return Math.max(...packet.subpackets.map(calc))
    case 5:
      return calc(packet.subpackets[0]) > calc(packet.subpackets[1]) ? 1 : 0
    case 6:
      return calc(packet.subpackets[0]) < calc(packet.subpackets[1]) ? 1 : 0
    case 7:
      return calc(packet.subpackets[0]) === calc(packet.subpackets[1]) ? 1 : 0
    default:
      return NaN
  }
}

export const second = (input: string) => calc(parse(input))
