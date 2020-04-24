import {Question} from '../types'
import { test } from 'fuzzyjs'

// NOTE: Christian helped me out with optimizing these functions.
export const doesMatchAllTags = (question: Question, tags: string[]): boolean => {
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

export const doesMatchAnyTags = (question: Question, tags: string[]): boolean => {
  if (!question.tags) {
    return tags.length === 0
  }

  for (let tag of tags) {
    if (question.tags.includes(tag)) {
      return true
    }
  }

  return false
}

export const doesMatchIntegrations = (question : Question, integration : string) => {
  if (integration === 'none') {
    return (question.integration === undefined || question.integration === '')
  } else if (integration === 'any') {
    return true
  } else {
    return question.integration === integration
  }
}

export enum FilterType {
  ANY = 'ANY',
  ALL = 'ALL'
};

const filteredQuestions = (questions: Question[], integration: string, tags: string[], search: string, filterLogic: FilterType) => {

  const results = questions.filter(question => {
    const matchesIntegration = doesMatchIntegrations(question, integration)
    const matchesTags = (filterLogic === FilterType.ALL) ?
      doesMatchAllTags(question, tags) :
      doesMatchAnyTags(question, tags)

    const isSearching = search.length > 0
    const matchesSearch = test(search, `${question.title} ${question.description}`)

    console.log({
      isSearching,
      matchesIntegration,
      matchesTags,
      matchesSearch
    })

    switch (filterLogic) {
      case FilterType.ALL:
        return matchesIntegration && matchesTags && matchesSearch

      case FilterType.ANY:
        return matchesIntegration || matchesTags || (isSearching && matchesSearch)
    }
  })

  return results
}


export default filteredQuestions;
