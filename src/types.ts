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

export type IntegrationSchema = {
  integrationDefinitionId: string;
  integrationTag: string;
  entities: Entity[];
  relationships: Relationship[];
};

export type Entity = {
  resourceName: string;
  type: string;
}

export type Relationship = {
  fromEntityType: string;
  toEntityType: string;
  class: string;
}
