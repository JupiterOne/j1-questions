import React, { useState, useEffect, useContext } from "react";

import Graph from "../Graph";
import { Node, Edge } from '../Graph/types';
import { IntegrationSchema } from "../../types";
import AppContext from "../../AppContext";

import {
  getNodesAndEdgesFromAst,
  loadGraph,
  flattenAst,
  getAllTypesForTraversal,
  createEdgeIdFromRelationship
} from "./graph";
import { QueryTraversalNode, parse } from "@jupiterone/query-language-parser";

const NODE_ORDER_COUNT_INCREMENT = 2;

const DEFAULT_INTEGRATIONS = ['aws', 'github', 'jira', 'okta'];

type QueryVisualizerProps = {
  query: string;
};

export const QueryVisualizer = ({ query }: QueryVisualizerProps) => {
  const {
    integrations,
    integrationTypeToIdMap,
    integrationSchemaMap
  } = useContext(AppContext);

  const [{ nodes, edges }, setNodesAndEdges] = useState<{
    nodes: Node[],
    edges: Edge[]
  }>({ nodes: [], edges: [] });

  useEffect(() => {
    try {
      const ast = parse(query);
      if (ast) {
        const schemas = integrations.map(type => {
          const id = integrationTypeToIdMap.get(type);
          return id ? integrationSchemaMap.get(id) : undefined;
        })
          .filter((schema): schema is IntegrationSchema => {
            return schema?.integration !== undefined
          });

        const entities = schemas.flatMap(schema => schema.integration.entities);
        const relationships = schemas.flatMap(schema => schema.integration.relationships);

        const graph = loadGraph(entities, relationships);

        const nodes = convertEntitiesToNodes(entities);
        const edges = convertRelationshipsToEdges(relationships);

        const {
          unique: { nodeIdSet, edgeIdSet },
          ordered,
        } = getNodesAndEdgesFromAst(graph, ast);

        const nodeOrder: { [id: string]: number } = {};
        const applyNodeOrderingForTraversal = (
          node: QueryTraversalNode,
          order: number
        ) => {
          const types: string[] = getAllTypesForTraversal(node);

          for (const type of types) {
            if (nodeOrder[type] === undefined) {
              nodeOrder[type] = order;
            }
          }

          for (const optionalNode of node.optionalTraversals ?? []) {
            const optionalPath = flattenAst(optionalNode.traversal);

            nodeOrderCount += NODE_ORDER_COUNT_INCREMENT;
            for (let i = 0; i < optionalPath.length; i++) {
              const optionallyTraversedNode = optionalPath[i];
              if (optionallyTraversedNode.target === "entities") {
                const optionalTypes = getAllTypesForTraversal(
                  optionallyTraversedNode
                );

                for (const optionalType of optionalTypes) {
                  nodeOrder[optionalType] = order + i;
                }
              }
            }
          }
        };

        let nodeOrderCount = 0;
        for (const node of ordered) {
          if (node.target === "entities") {
            nodeOrderCount += NODE_ORDER_COUNT_INCREMENT;
            applyNodeOrderingForTraversal(node, nodeOrderCount);
          }
        }

        // pull out path defined by ast,
        // apply path to graph that is displayed

        const queryNodes = Object.values(nodes)
          .filter((n: Node) => nodeIdSet.has(n.id))
          .map((node) => {
            const newNode = {
              ...node,
            };
            newNode.level =
              nodeOrder[node.id] ?? nodeOrderCount + NODE_ORDER_COUNT_INCREMENT;
            return newNode;
          });

        const queryEdges = edges
          .filter((e: Edge) => edgeIdSet.has(e.id))

        setNodesAndEdges({
          nodes: queryNodes,
          edges: queryEdges,
        });
      }
    } catch (err) {
      console.error("query error:", err);
    }
  }, [query, integrations, integrationSchemaMap]);

  return (
    <Graph nodes={nodes} edges={edges} applyHierarchy={true}/>
  );
};


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

export default QueryVisualizer;
