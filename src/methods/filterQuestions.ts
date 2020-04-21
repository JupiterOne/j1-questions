import {Question} from '../types'
// import fuzzy from 'fuzzy';
import { test } from 'fuzzyjs'
// import matchSorter from 'match-sorter'

// interface FilterOptions {
//   searchText: string;
//   integration: string | 'none';
//   tags: string[];
// }

// NOTE: Christian helped me out with optimizing this function.
const doesMatchTags = (question: Question, tags: string[]): boolean => {
  // Return true if no tags are being filtered
  if (!question.tags) {
    return tags.length === 0
  }

  for (let tag of tags) {
    if (!question.tags.includes(tag)) {
      return false
    }
  }

  return true
}

// NOTE: Christian helped me out with optimizing this function.
const filteredQuestions = (questions: Question[], integration: string, tags: string[], search: string, questionNumber: number) => {
  const isFiltering = integration === 'none' || tags.length === 0 || search === '';

  const results = questions.filter(question => {
    const matchesIntegration = integration === 'none' || question.integration === integration
    const matchesTags = doesMatchTags(question, tags)
    const matchesSearch = test(search, `${question.title} ${question.description}`)

    return matchesIntegration && matchesTags && matchesSearch
  })

  if (isFiltering) {
    return results.slice(0, questionNumber)
  }

  return results
}


export default filteredQuestions;
