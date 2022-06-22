const { promises: fs }= require('fs');
const path = require('path');
const triplets = require('../src/data/rawTriplets.json');

main().catch(console.error);

async function main() {
  const typeTriplets = triplets
    // extract out types only
    .filter(triplet => {
      return triplet.from_entity_type_or_class[0] === triplet.from_entity_type_or_class[0].toLowerCase()
        && triplet.to_entity_type_or_class[0] === triplet.to_entity_type_or_class[0].toLowerCase();
    })
    .map(triplet => {
      const sourceType = triplet.from_entity_type_or_class
      const targetType = triplet.to_entity_type_or_class
      const relationshipClass = triplet.relationship_class

      return {
        sourceType,
        targetType,
        _class: relationshipClass,
        _type: `${sourceType}|${relationshipClass}|${targetType}`
      }
    });


  const awsTriplets = filterTripletTypes(typeTriplets, 'aws');
  const githubTriplets = filterTripletTypes(typeTriplets, 'github');
  const jiraTriplets = filterTripletTypes(typeTriplets, 'jira');
  const oktaTriplets = filterTripletTypes(typeTriplets, 'okta');
  const googleTriplets = filterTripletTypes(typeTriplets, 'google');

  const integrationSchemas = [
    {
      integrationDefinitionId: '7a669809-6e55-45b9-bf23-aa27613118e9',
      integration: {
        entities: deriveEntitiesFromTriplets(awsTriplets, 'aws'),
        relationships: awsTriplets
      }
    },
    {
      integrationDefinitionId: '1babe084-d58d-4ff0-9d98-e0d9bb8499be',
      integration: {
        entities: deriveEntitiesFromTriplets(githubTriplets, 'github'),
        relationships: githubTriplets
      }
    },
    {
      integrationDefinitionId: '155e9e67-3612-44bb-842c-5265a9035345',
      integration: {
        entities: deriveEntitiesFromTriplets(jiraTriplets, 'jira'),
        relationships: jiraTriplets
      }
    },
    {
      integrationDefinitionId: 'bc9510d4-27b8-4102-a51f-16f62291cdf6',
      inegration: {
        entities: deriveEntitiesFromTriplets(oktaTriplets, 'okta'),
        relationships: oktaTriplets
      }
    },
    {
      integrationDefinitionId: 'shit',
      integration: {
        entities: deriveEntitiesFromTriplets(googleTriplets, 'google_cloud'),
        relationships: googleTriplets
      }
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
    return triplet.sourceType.startsWith(type) && triplet.targetType.startsWith(type)
  });
}

function deriveEntitiesFromTriplets (triplets, type) {
  const typeSet = new Set();

  for (const { sourceType, targetType } of triplets) {
    if (sourceType.startsWith(type)) {
      typeSet.add(sourceType)
    }
    if (targetType.startsWith(type)) {
      typeSet.add(targetType);
    }
  }

  const entities = [];

  for (const type of typeSet.values()) {
    entities.push({
      _type: type,
      _class: [],
      resourceName: `Some ${type}`
    });
  }

  return entities;
}
