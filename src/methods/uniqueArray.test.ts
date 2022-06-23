import uniqueArray from './uniqueArray'

test('returns array with only unique value', () => {
  expect(uniqueArray(['1', '1', '2'])).toStrictEqual(['1', '2'])
})
