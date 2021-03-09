const babel = require('@babel/core')

const example =
  `const func = () => 'test';\n` +
  `\n` +
  `const AUTH_CHECK_REQUEST = '@auth/CHECK_REQUEST';\n` +
  `const AUTH_CHECK_SUCCESS = 3;`

const expectedCode =
  `const func = () => 'test';\n` +
  `\n` +
  `const AUTH_CHECK_REQUEST = "0";\n` +
  `const AUTH_CHECK_SUCCESS = 3;`

const expectedDictionary = {
  '0': '@auth/CHECK_REQUEST',
}

it('replacement in code', () => {
  const { code } = babel.transform(example, { plugins: [ [ require('../lib'), { filter: () => true } ] ], configFile: false })
  expect(code).toBe(expectedCode)
})

it('dictionary generation', () => {
  let dictionary = {}
  babel.transform(example, { plugins: [ [ require('../lib'), { filter: () => true, saveDictionary: (d) => dictionary = d } ] ], configFile: false })
  expect(dictionary).toEqual(expectedDictionary)
})


