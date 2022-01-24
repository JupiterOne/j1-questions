export interface Compliance {
  standard: string;
  controls?: any[];
  requirements?: any[];
}

export interface Query {
  query: string;
  name?: string;
}

export interface Question {
  compliance: Compliance[];
  description: string;
  title: string;
  queries: Query[] | Record<string, string>;
  tags: string[];
  integration?: string;
  category?: string;
  hash?: string;
}

export interface ManagedQuestionJSON {
  integrations: any;
  questions: Question[];
}
