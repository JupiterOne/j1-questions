import filterQuestions, {
  FilterType,
  doesMatchAllTags,
  doesMatchAnyTags
} from "./filterQuestions";
import { Question } from "../types";

const testData: any = [
  {
    compliance: [],
    integration: "jest",
    description: "",
    title: "Why do I test things?",
    queries: [],
    tags: ["testing"]
  },
  {
    compliance: [],
    description: "",
    title: "What do I need to do before submitting my code?",
    queries: [],
    tags: ["code", "submitting"]
  },
  {
    compliance: [],
    description: "Santa party",
    title: "Why does everything sound better in triplets?",
    queries: [],
    tags: ["three", "3", "triplets"]
  },
  {
    compliance: [],
    description: "Texting is dangerous!",
    title: "WHY TEXT?",
    queries: []
  }
];

describe("doesMatchAnyTags", () => {
  const sample: Question = {
    compliance: [],
    description: "",
    title: "",
    queries: [],
    tags: ["a", "b"]
  };

  test("matches single tag", () => {
    expect(doesMatchAnyTags(sample, ["a"])).toBeTruthy();
    expect(doesMatchAnyTags(sample, ["b"])).toBeTruthy();
    expect(doesMatchAnyTags(sample, ["c"])).toBeFalsy();
  });

  test("matches with multiple tags", () => {
    expect(doesMatchAnyTags(sample, ["a", "b"])).toBeTruthy();
    expect(doesMatchAnyTags(sample, ["b", "c"])).toBeTruthy();
  });
});

describe("doesMatchAllTags", () => {
  const sample: Question = {
    compliance: [],
    description: "",
    title: "",
    queries: [],
    tags: ["a", "b"]
  };

  test("matches single tag", () => {
    expect(doesMatchAllTags(sample, ["a"])).toBeTruthy();
    expect(doesMatchAllTags(sample, ["b"])).toBeTruthy();
    expect(doesMatchAllTags(sample, ["c"])).toBeFalsy();
  });

  test("matches with multiple tags", () => {
    expect(doesMatchAllTags(sample, ["a", "b"])).toBeTruthy();
    expect(doesMatchAllTags(sample, ["b", "c"])).toBeFalsy();
  });
});

describe("filterQuestions", () => {
  const titlesOfQuestions = (questions: Question[]) => {
    return questions.map(question => question.title);
  };
  test("(ALL) filters questions by integration", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(testData, ["jest"], [], "", FilterType.ALL, [])
      )
    ).toEqual(["Why do I test things?"]);
  });
  test("(ALL) filters questions by tag", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(testData, ["none"], ["3"], "", FilterType.ALL, [])
      )
    ).toEqual(["Why does everything sound better in triplets?"]);
  });
  test("(ALL) filters questions by title", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(testData, ["none"], [], "better", FilterType.ALL, [])
      )
    ).toEqual(["Why does everything sound better in triplets?"]);
  });
  test("(ALL) filters questions by integration and tag", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(testData, ["jest"], ["testing"], "", FilterType.ALL, [])
      )
    ).toEqual(["Why do I test things?"]);
  });
  test("(ALL) filters questions by integration and title", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(testData, ["jest"], [], "things", FilterType.ALL, [])
      )
    ).toEqual(["Why do I test things?"]);
  });
  test("(ALL) filters questions by title and tag", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(
          testData,
          ["none"],
          ["3"],
          "triplets",
          FilterType.ALL,
          []
        )
      )
    ).toEqual(["Why does everything sound better in triplets?"]);
  });
  test("(ALL) filters questions by integration, tag, and title", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(
          testData,
          ["jest"],
          ["testing"],
          "test",
          FilterType.ALL,
          []
        )
      )
    ).toEqual(["Why do I test things?"]);
  });

  test("(ANY) filters questions by integration and tag", () => {
    expect(
      titlesOfQuestions(
        filterQuestions(testData, ["jest"], ["3"], "", FilterType.ANY, [])
      )
    ).toEqual([]);
  });

  test("(ANY) filters questions such that it shows all results when no filters", () => {
    expect(
      filterQuestions(testData, ["none"], [], "", FilterType.ANY, [])
    ).toEqual(testData);
  });
});
