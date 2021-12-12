import { first, second } from '../src/day12'

test('day 12-1-1 first', () => {
  const input = `
    start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end
    `.replaceAll(' ', '')

  expect(first(input)).toBe(10)
})

test('day 12-1-2 first', () => {
  const input = `
    fs-end
    he-DX
    fs-he
    start-DX
    pj-DX
    end-zg
    zg-sl
    zg-pj
    pj-he
    RW-he
    fs-DX
    pj-RW
    zg-RW
    start-pj
    he-WI
    zg-he
    pj-fs
    start-RW
    `.replaceAll(' ', '')

  expect(first(input)).toBe(226)
})

test('day 12-2 second', () => {
  const input = `
    start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end
    `.replaceAll(' ', '')

  expect(second(input)).toBe(36)
})
