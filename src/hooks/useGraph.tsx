import React, { useState, useEffect, useContext } from 'react';
import Context from '../AppContext'

import { Node, Edge } from '../components/Graph/types';
import { createEdgeIdFromRelationship } from '../components/QueryVisualizer/graph';

import globalSchema from '../data/globalSchema.json';

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

    const entities = schemas.flatMap(schema => schema.integration.entities);
    const relationships = schemas.flatMap(schema => schema.integration.relationships);

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

function convertEntitiesToNodes(entities: IntegrationSchema['integration']['entities']): Node[] {
  return entities.map(e => ({
    id: e._type,
    label: e.resourceName
  }));
}

function convertRelationshipsToEdges(relationships: IntegrationSchema['integration']['relationships']): Edge[] {
  return relationships.map(r => ({
    id: createEdgeIdFromRelationship(r),
    label: r._class,
    from: r.sourceType,
    to: r.targetType
  }));
}
