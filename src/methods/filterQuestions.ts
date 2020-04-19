import {Question} from '../types'
// import fuzzy from 'fuzzy';
// import { test } from 'fuzzyjs'
import matchSorter from 'match-sorter'

// interface FilterOptions {
//   searchText: string;
//   integration: string | 'none';
//   tags: string[];
// }

const filteredQuestions = (questions: Question[], integration: string, tags: string[], search: string, questionNumber: number) => (
  matchSorter(
  questions
    .slice(0, !(integration !== 'none' || tags.length !== 0 || search !== '') ? questionNumber : questions.length)
    .filter((question: Question) => integration !== 'none' ? question.integration === integration : true)
    .filter((question: Question) => {
      const array : boolean[] = []
      for (let key of tags) {
        array.push(question.tags !== undefined ? question.tags.includes(key) : false)
      }
      return !array.includes(false)
    })
  ,search, {keys: ['title', 'description', 'tags']})
)


export default filteredQuestions;
