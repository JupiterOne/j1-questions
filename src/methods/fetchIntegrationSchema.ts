import integrationSchemas from '../data/integrationSchemas.json';
import { IntegrationSchema } from '../types';

const fetchIntegrationSchema = fetchIntegrationSchemaImpl;
export default fetchIntegrationSchema;

export async function fetchIntegrationSchemaMock(integrationDefinitionId: string) {
  return integrationSchemas.find(
    schema => schema.integrationDefinitionId === integrationDefinitionId
  ) as unknown as IntegrationSchema;
}

export async function fetchIntegrationSchemaImpl(
  integrationDefinitionId: string
): Promise<IntegrationSchema> {
  const host = window.location.host;
  const domain = host.includes('localhost') || host.includes('dev') ?
    'https://api.dev.jupiterone.io' :
    'https://api.us.jupiterone.io';

  const response = await fetch(
    `${domain}/integrations-public/v1/graph-schema/${integrationDefinitionId}`
  );

  let schema: IntegrationSchema;

  if (response.ok) {
    schema = await response.json();
  } else {
    schema = await fetchIntegrationSchemaMock(integrationDefinitionId);
  }

  if (schema) {
    return {
      integrationDefinitionId,
      ...schema
    }
  } else {
    return {
      integrationDefinitionId,
      integration: {
        entities: [],
        relationships: [],
      }
    }
  }
};

