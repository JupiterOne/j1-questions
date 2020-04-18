import {Question} from '../types'
import fuzzy from 'fuzzy';

// interface FilterOptions {
//   searchText: string;
//   integration: string | 'none';
//   tags: string[];
// }

const filteredQuestions = (questions: Question[], integration: string, tags: string[], search: string, questionNumber: number) => (
  questions
    .slice(1, !(integration !== 'none' || tags.length !== 0 || search !== '') ? questionNumber : questions.length)
    .filter((question: Question) => integration !== 'none' ? question.integration === integration : true)
    .filter((question: Question) => {
      const array : boolean[] = []
      for (let key of tags) {
        array.push(question.tags !== undefined ? question.tags.includes(key) : false)
      }
      return !array.includes(false)
    })
    .filter((question: Question) => {
      if (search !== 'none' && typeof search === 'string') {
        return fuzzy.match(search, question.title)
      } else {
        return true
      }
    })
)


export default filteredQuestions;
