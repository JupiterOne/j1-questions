import { useState, useEffect, useContext } from 'react';
import Context from '../AppContext'

import { Node, Edge } from '../components/Graph/types';
import { createEdgeIdFromRelationship } from '../components/QueryVisualizer/graph';

import classTypeMappings from '../data/classTypes.json';
import globalSchema from '../data/globalSchema.json';
import { IntegrationSchema, Entity, Relationship, RelationshipMapping, MappingDirection } from '../types';
const cartesian = require('cartesian');

export function useGraph () {
  const {
    integrations,
    integrationSchemaMap,
    integrationTypeToIdMap
  } = useContext(Context);

  const [{ nodes, edges}, setGraph] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({ nodes: [], edges: []});

  useEffect(() => {
    const schemas = [
      globalSchema,
      ...integrations
        .map(type => {
          const id = integrationTypeToIdMap.get(type);
          return id ? integrationSchemaMap.get(id) : undefined;
        })
        .filter((schema): schema is IntegrationSchema => {
          return schema?.integration !== undefined
        })
    ]

    let entities: Entity[] = [];
    let relationships: Relationship[] = [];
    let mappings: RelationshipMapping[] = [];

    for (const schema of schemas) {
      entities = entities.concat(schema.integration.entities);
      relationships = relationships.concat(schema.integration.relationships);
      mappings = mappings.concat(schema.mappings ?? []);
    }

    const mappedRelationships = convertMappingsToRelationships(entities, mappings);

    relationships = relationships.concat(mappedRelationships);

    setGraph({
      nodes: convertEntitiesToNodes(entities),
      edges: convertRelationshipsToEdges(relationships)
    });
  }, [integrations, integrationTypeToIdMap, integrationSchemaMap])

  return {
    nodes,
    edges,
    setGraph
  }
}

function convertEntitiesToNodes(entities: Entity[]): Node[] {
  return entities.map(e => ({
    id: e._type,
    label: e.resourceName
  }));
}

function convertRelationshipsToEdges(relationships: Relationship[]): Edge[] {
  return relationships.map(r => ({
    id: createEdgeIdFromRelationship(r),
    label: r._class,
    from: r.sourceType,
    to: r.targetType
  }));
}

function convertMappingsToRelationships(entities: Entity[], mappings: RelationshipMapping[]) {
  // build lookup of entities
  const entityLookup = new Map<string, Entity>(entities.map(e => (
    [e._type, e]
  )));

  const relationships: Relationship[] = [];
  for (const mapping of mappings) {
    const {
      direction,
      sourceType,
      sourceClass,
      targetType,
      targetClass,
      _class: relationshipClass
    } = mapping

    const sourceEntities = getEntitiesByTypeOrClass(entityLookup, sourceType, sourceClass);
    const targetEntities = getEntitiesByTypeOrClass(entityLookup, targetType, targetClass);

    const combinations = cartesian([
      sourceEntities,
      targetEntities
    ]);

    for (const [sourceEntity, targetEntity] of combinations) {
      let sourceType: string;
      let targetType: string;

      if (direction === MappingDirection.Forward) {
        sourceType = sourceEntity._type;
        targetType = targetEntity._type;
      } else {
        sourceType = targetEntity._type;
        targetType = sourceEntity._type;
      }

      relationships.push({
        sourceType,
        targetType,
        _type: '',
        _class: relationshipClass ?? 'RELATES_TO',
      })
    }
  }

  return relationships;
}

function getEntitiesByTypeOrClass(
  entityLookup: Map<string, Entity>,
  entityType?: string,
  entityClass?: string
): Entity[] {
  let entities: Entity[] = [];
  if (entityType) {
    let entity = entityLookup.get(entityType);
    if (entity) {
      entities.push(entity);
    }
  } else if (entities.length === 0 && entityClass) {
    const associatedTypes = ((classTypeMappings as any).byClass[entityClass] ?? []) as string[];
    entities = entities.concat(
      associatedTypes.map((type: string) => entityLookup.get(type))
        .filter((entity: Entity | undefined): entity is Entity => entity !== undefined)
    )
  }

  return entities;
}
