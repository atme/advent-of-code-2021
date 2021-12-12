type Tree = Record<string, string[]>

export const parse = (input: string) => {
  const tree: Tree = {}

  input
    .trim()
    .split('\n')
    .forEach((s) => {
      const [from, to] = s.split('-')
      if (from in tree) {
        tree[from].push(to)
      } else {
        tree[from] = [to]
      }

      if (from === 'start') {
        return
      }

      if (to in tree) {
        tree[to].push(from)
      } else {
        tree[to] = [from]
      }
    })

  return tree
}

export const first = (input: string) => {
  const tree = parse(input)
  let paths = [['start']]

  while (!paths.every((path) => path.includes('end'))) {
    const newPaths: string[][] = []
    paths.forEach((path) => {
      const node = path[path.length - 1]

      if (node === 'end') {
        newPaths.push(path)
        return
      }

      if (node in tree) {
        tree[node]
          .filter((n) => /[A-Z]+/.test(n) || !path.includes(n))
          .forEach((n) => newPaths.push([...path, n]))
      }
    })

    paths = newPaths
  }

  return paths.length
}

export const second = (input: string) => {
  const tree = parse(input)
  let paths = [['start']]

  while (!paths.every((path) => path.includes('end'))) {
    const newPaths: string[][] = []
    paths.forEach((path) => {
      const node = path[path.length - 1]

      if (node === 'end') {
        newPaths.push(path)
        return
      }

      const wasOnlyOnceInSmallCave = path
        .filter((n) => /[a-z]+/.test(n))
        .every((node, index, p) => p.indexOf(node) === index)

      if (node in tree) {
        tree[node]
          .filter(
            (n) =>
              /[A-Z]+/.test(n) || wasOnlyOnceInSmallCave || !path.includes(n)
          )
          .forEach((n) => newPaths.push([...path, n]))
      }
    })

    paths = newPaths
  }

  return paths.length
}
