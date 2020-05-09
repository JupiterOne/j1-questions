import { Question } from "../types";

export const doesMatchCategories = (
  question: Question,
  categories: string[]
): boolean => {
  if (categories.length === 0) {
    return true;
  } else if (question.category) {
    return categories.includes(question.category);
  } else {
    return false;
  }
};

// NOTE: Christian helped me out with optimizing these functions. VV

export const doesMatchAllTags = (
  question: Question,
  tags: string[]
): boolean => {
  // Return true if no tags are being filtered
  if (!question.tags) {
    return tags.length === 0;
  }

  for (let tag of tags) {
    if (!question.tags.includes(tag)) {
      return false;
    }
  }

  return true;
};

export const doesMatchAnyTags = (
  question: Question,
  tags: string[]
): boolean => {
  if (!question.tags) {
    return true;
  } else if (tags.length === 0) {
    return true;
  }

  for (let tag of tags) {
    if (question.tags.includes(tag)) {
      return true;
    }
  }

  return false;
};

export const doesMatchIntegrations = (
  question: Question,
  integrations: string[]
) => {
  if (integrations.length === 0) {
    return true;
  } else if (
    integrations.includes("none") &&
    question.integration === undefined
  ) {
    return true;
  } else if (integrations.includes("none")) {
    return true;
  } else {
    return integrations.includes(
      question.integration !== undefined ? question.integration : ""
    );
  }
};

export enum FilterType {
  ANY = "ANY",
  ALL = "ALL"
}

const filteredQuestions = (
  questions: Question[],
  integrations: string[],
  tags: string[],
  search: string,
  filter: FilterType,
  categories: string[]
) => {
  const results = questions.filter(question => {
    const matchesIntegration = doesMatchIntegrations(question, integrations);
    const matchesTags =
      filter === FilterType.ALL
        ? doesMatchAllTags(question, tags)
        : doesMatchAnyTags(question, tags);

    const matchesSearch = `${question.title} ${question.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategories = doesMatchCategories(question, categories);

    return (
      matchesIntegration && matchesTags && matchesSearch && matchesCategories
    );
  });

  return results;
};

export default filteredQuestions;
