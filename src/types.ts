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

export interface IntegrationMetadata {
  id: string;
  type: string;
  title: string;
}

export interface ManagedQuestionJSON {
  integrations: Record<string, IntegrationMetadata>;
  questions: Question[];
}

export type IntegrationSchema = {
  integrationDefinitionId: string;
  integration: {
    entities: Entity[];
    relationships: Relationship[];
  }
};

export type Entity = {
  resourceName: string;
  _type: string;
  _class: string[];
}

export type Relationship = {
  sourceType: string;
  targetType: string;
  _type: string;
  _class: string;
}
