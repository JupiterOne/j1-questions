import {ManagedQuestionJSON} from '../types'
import hash from 'hash.js'

const fetchQuestions = async () => {
  let result : ManagedQuestionJSON= await fetch('https://apps.dev.jupiterone.io/static/managed-questions.json')
    .then((r: any) => r.json())
  const impropvedResultQuestions = result.questions.map(question => {
    return {
      ...question,
      hash: hash.sha1().update(question.title).digest('hex')
    };
  })
  result.questions = impropvedResultQuestions
  return result
}

export default fetchQuestions
