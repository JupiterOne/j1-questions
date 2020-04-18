export interface Compliance {
  standard: string;
  controls?: any[];
  requirements?: any[]
}

export interface Query {
  query: string;
  name?: 'good' | 'bad';
}

export interface Question {
  compliance: Compliance[];
  description: string;
  title: string;
  queries: Query[];
  tags: string[];
}

export interface ManagedQuestionJSON {
  integrations: {};
  questions: Question[]
}
