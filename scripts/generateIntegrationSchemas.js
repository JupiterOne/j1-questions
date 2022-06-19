const { promises: fs }= require('fs');
const path = require('path');
const triplets = require('../src/data/rawTriplets.json');

main().catch(console.error);

async function main() {
  const typeTriplets = triplets
    .filter(triplet => {
      return triplet.from_entity_type_or_class[0] === triplet.from_entity_type_or_class[0].toLowerCase()
        && triplet.to_entity_type_or_class[0] === triplet.to_entity_type_or_class[0].toLowerCase();
    })
    .map(triplet => {
      const fromEntityType = triplet.from_entity_type_or_class
      const toEntityType = triplet.to_entity_type_or_class
      const relationshipClass = triplet.relationship_class

      return {
        fromEntityType,
        toEntityType,
        class: relationshipClass,
        type: `${fromEntityType}|${relationshipClass}|${toEntityType}`
      }
    });


  const awsTriplets = filterTripletTypes(typeTriplets, 'aws');
  const githubTriplets = filterTripletTypes(typeTriplets, 'github');
  const jiraTriplets = filterTripletTypes(typeTriplets, 'jira');
  const oktaTriplets = filterTripletTypes(typeTriplets, 'okta');

  const integrationSchemas = [
    {
      integrationDefinitionId: '7a669809-6e55-45b9-bf23-aa27613118e9',
      integrationTag: 'aws',
      entities: deriveEntitiesFromTriplets(awsTriplets, 'aws'),
      relationships: awsTriplets
    },
    {
      integrationDefinitionId: '1babe084-d58d-4ff0-9d98-e0d9bb8499be',
      integrationTag: 'github',
      entities: deriveEntitiesFromTriplets(githubTriplets, 'github'),
      relationships: githubTriplets
    },
    {
      integrationDefinitionId: '155e9e67-3612-44bb-842c-5265a9035345',
      integrationTag: 'jira',
      entities: deriveEntitiesFromTriplets(jiraTriplets, 'jira'),
      relationships: jiraTriplets
    },
    {
      integrationDefinitionId: 'bc9510d4-27b8-4102-a51f-16f62291cdf6',
      integrationTag: 'okta',
      entities: deriveEntitiesFromTriplets(oktaTriplets, 'okta'),
      relationships: oktaTriplets
    }
  ];

  const packageJsonPath = require.resolve('../package.json');
  const dataDir = path.resolve(path.dirname(packageJsonPath), 'src/data');


  await fs.writeFile(
    `${dataDir}/integrationSchemas.json`,
    JSON.stringify(integrationSchemas, null, 2),
    'utf8'
  );
}

function filterTripletTypes (triplets, type) {
  return triplets.filter(triplet => {
    return triplet.fromEntityType.startsWith(type) && triplet.toEntityType.startsWith(type)
  });
}

function deriveEntitiesFromTriplets (triplets, type) {
  const typeSet = new Set();

  for (const { fromEntityType, toEntityType } of triplets) {
    if (fromEntityType.startsWith(type)) {
      typeSet.add(fromEntityType);
    }
    if (toEntityType.startsWith(type)) {
      typeSet.add(toEntityType);
    }
  }

  const entities = [];

  for (const type of typeSet.values()) {
    entities.push({
      type,
      resourceName: `Some ${type}`
    });
  }

  return entities;
}
