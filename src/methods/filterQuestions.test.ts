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
    title: 'This is my second item.',
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
    const questions = filterQuestions(testData, 'none', ['tag2'], '', 5);

    expect(questions).toHaveLength(1);
    expect(questions[0].title).toEqual('This is my second item.')
  })

  test('filters questions by title', () => {
    expect(filterQuestions(testData, 'none', [], 'tite', 5).length).toBe(2)
  })
})
