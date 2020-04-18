import filterQuestions from './filterQuestions'
import {Question} from '../types'
const testData : Question[] = [
  {
    compliance: [
      {
        standard: 'string'
      }
    ],
    description: 'description',
    title: 'This is my title.',
    queries: [
      {
        query: 'query',
      }
    ],
    tags: ['tag'],
  },
  {
    compliance: [
      {
        standard: 'string'
      }
    ],
    description: 'description',
    title: 'This is my seond item.',
    queries: [
      {
        query: 'query',
      }
    ],
    tags: ['tag2'],
  }
]

describe('filterQuestions', () => {
  test('filters questions by tag', () => {
    expect(filterQuestions(testData, 'none', ['tag2'], '', 5).length).toBe(1)
  })

  test('filters questions by title', () => {
    expect(filterQuestions(testData, 'none', [], 'item', 5).length).toBe(1)
  })
})
