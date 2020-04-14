import fetchQuestions from './fetchQuestions'
import {ManagedQuestionJSON} from '../types'

test('grabs appropriate questions', async () => {
  const result : ManagedQuestionJSON = await fetchQuestions()
  console.log(result)
  expect(result).not.toBeNull()
})
