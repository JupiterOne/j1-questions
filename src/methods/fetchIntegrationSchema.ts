import integrationSchemas from '../data/integrationSchemas.json';
import { IntegrationSchema } from '../types.js';

export default fetchIntegrationSchema;
export async function fetchIntegrationSchema(integrationDefinitionId: string) {
  return integrationSchemas.find(
    schema => schema.integrationDefinitionId === integrationDefinitionId
  ) as unknown as IntegrationSchema;
}

export async function fetchIntegrationSchemaImpl(integrationDefinitionId: string) {
  const host = window.location.host;
  const domain = host.includes('localhost') || host.includes('dev') ?
    'https://apps.dev.jupiterone.io' :
    'https://apps.us.jupiterone.io';

  const response = await fetch(
    `${domain}/integrations-public/v1/graph-schema/${integrationDefinitionId}`
  );

  return response.json();
};

