type Rules = Record<string, string>

export const parse = (input: string): [string, Rules] => {
  const [polymer, rules] = input.trim().split('\n\n')

  return [
    polymer,
    Object.fromEntries(rules.split('\n').map((s) => s.split(' -> '))),
  ]
}

const addTo = (dict: Record<string, number>, key: string, n: number) => {
  dict[key] = (dict[key] || 0) + n
}

const generateTemplate = (input: string, steps: number) => {
  const [polymer, rules] = parse(input)

  let template: Record<string, number> = {}
  for (let index = 0; index < polymer.length - 1; index++) {
    addTo(template, polymer.slice(index, index + 2), 1)
  }

  for (let index = 0; index < steps; index++) {
    let newTemplate: Record<string, number> = {}
    Object.keys(template).forEach((key) => {
      addTo(newTemplate, key.slice(0, 1) + rules[key], template[key])
      addTo(newTemplate, rules[key] + key.slice(-1), template[key])
    })
    template = newTemplate
  }

  const result: Record<string, number> = {}
  Object.keys(template).forEach((key) => {
    addTo(result, key.slice(0, 1), template[key])
  })

  return result
}

const calcAnswer = (dict: Record<string, number>) => {
  const sortedKeys = Object.keys(dict).sort((a, b) => dict[b] - dict[a])

  const mostCommonElement = sortedKeys[0]
  const leastCommonElement = sortedKeys[sortedKeys.length - 1]

  return dict[mostCommonElement] - dict[leastCommonElement] + 1
}

export const first = (input: string) => calcAnswer(generateTemplate(input, 10))

export const second = (input: string) => calcAnswer(generateTemplate(input, 40))
