import fetchQuestions from './fetchQuestions'
import {ManagedQuestionJSON} from '../types'

test('grabs appropriate questions', async () => {
  const result : ManagedQuestionJSON = await fetchQuestions()
  console.log(result.questions[0].tags)
  expect(result).not.toBeNull()
})
