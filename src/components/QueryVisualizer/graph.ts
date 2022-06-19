import Graph, {
  MultiGraph
} from 'graphology';

import {
  bidirectional,
  edgePathFromNodePath,
} from "graphology-shortest-path";

import {
  allSimplePaths
} from "graphology-simple-path";

import {
  RootQueryNode,
  QueryTraversalNode,
} from '@jupiterone/query-language-parser';
import { reverse } from "@jupiterone/query-language-reverser";
import zip from 'lodash/zip';

import { Node, Edge } from '../Graph/types';
import classTypeMappings from '../../data/classTypes.json';
import { Entity, Relationship } from '../../types';

const cartesian = require('cartesian');

export type NodeAttributes = {}
export type EdgeAttributes = {
  type: string;
}

export const createMultiGraph = () => new MultiGraph<NodeAttributes, EdgeAttributes>();

export function createEdgeIdFromRelationship (relationship: Relationship) {
  return `${relationship.fromEntityType}-${relationship.class}->${relationship.toEntityType}`
}

export function loadGraph(entities: Entity[], relationships: Relationship[]) {
  const graph = createMultiGraph();

  const nodeSet = new Set([
    ...entities.map((entity) => entity.type),
  ]);

  for (const node of nodeSet.values()) {
    graph.addNode(node);
  }

  const edgeSet = new Set();
  for (const relationship of relationships) {
    const fromNode = relationship.fromEntityType;
    const toNode = relationship.toEntityType;
    const edgeId = createEdgeIdFromRelationship(relationship);

    if (nodeSet.has(fromNode) && nodeSet.has(toNode) && !edgeSet.has(edgeId)) {
      edgeSet.add(edgeId);

      graph.addEdgeWithKey(edgeId, fromNode, toNode, {
        type: relationship.class,
      });
    }
  }

  return graph;
}

export function getAllTypesForTraversal(node: QueryTraversalNode) {
  const classTypes  = (node.classes ?? [])
    .flatMap(entityClass => (classTypeMappings as any).byClass[entityClass] ?? []);

  const dedupedSet = new Set([
    ...classTypes, ...(node.types ?? [])
  ]);

  return dedupedSet.size > 0
    ? [...dedupedSet.values()]
    : Object.keys(classTypeMappings.byType);
}

type FindShortestPathInput = {
  graph: MultiGraph<NodeAttributes, EdgeAttributes>;
  from: string;
  to: string;
}

export function findShortestPath({ graph, from, to }: FindShortestPathInput) {
  const nodePath = bidirectional(graph, from, to);

  if (nodePath) {
    const edgePath = edgePathFromNodePath(graph, nodePath);
    const nodes = nodePath.map((nodeId) => ({
      type: "node",
      id: nodeId,
      entity: nodeId,
    }));

    const edges =
      edgePath?.map((edgeId) => ({
        type: "edge",
        id: edgeId,
        relationship: graph.getEdgeAttributes(edgeId)?.type,
      })) ?? [];

    return zip(nodes, edges)
      .flat()
      .filter((obj: any) => obj !== undefined);
  } else {
    return null;
  }
}

export function convertPathToQuery(path: any): string {
  const astNodes = path.map((pathNode: any, index: number) => {
    const classOrType = pathNode.entity ?? pathNode.relationship;
    const isClass = classOrType[0] === classOrType[0].toUpperCase();

    return {
      type: "traversal",
      classes: isClass ? [classOrType] : undefined,
      types: isClass ? undefined : [classOrType],
      position: index,
      target: pathNode.type === "node" ? "entities" : "relationships",
    };
  });

  const ast = astNodes.shift(); // icky
  let currentNode = ast;
  for (const node of astNodes) {
    currentNode.next = node;
    currentNode = currentNode.next;
  }

  return reverse(ast);
}

export function convertSelectedToQuery(
  graph: MultiGraph<NodeAttributes, EdgeAttributes>,
  entities: [string, string]
) {
  if (entities.length === 2) {
    // If we've selected two nodes (and only two nodes)
    const path = findShortestPath({
      graph,
      to: entities[0],
      from: entities[1],
    });
    if (path) {
      return convertPathToQuery(path);
    }
  }
  return "";
}

export function findNeighbors(graph: MultiGraph<NodeAttributes, EdgeAttributes>, path: string[]) {
  const encounteredNodesSet = new Set(path);
  const lastItem = path[path.length - 1];
  const neighbors = graph.neighbors(lastItem);
  return neighbors.filter((n: any) => !encounteredNodesSet.has(n));
}

export function buildNeighborsSubgraph(
  graph: MultiGraph<NodeAttributes, EdgeAttributes>,
  source: string,
  neighbors: string[]
) {
  const nodes = [source, ...neighbors];
  const simplePaths = [];
  for (const neighbor of neighbors) {
    simplePaths.push(...allSimplePaths(graph, source, neighbor));
  }

  const subGraph = new MultiGraph() as any;

  for (const node of nodes) {
    subGraph.addNode(node);
  }

  let edgeSet = new Set<string>();
  for (const path of simplePaths) {
    const edges = edgePathFromNodePath(graph, path);

    if (edges) {
      for (const edge of edges) {
        if (!edgeSet.add(edge)) {
          // todo figure out better typing here
          subGraph.addEdge((graph as any).getEdge(edge));
        }
      }
    }
  }

  return subGraph;
}

export type CreateNodeOptions = {
  id: string;
  label: string;
  color?: string;
}

export function createNode({id, label, color}: CreateNodeOptions): Node {
  return {
    id,
    label,
    color,
    shape: "dot",
    level: 0,
  };
}

export type CreateEdgeOptions = {
  id: string;
  from: string;
  to: string;
  label: string;
}

export function createEdge({ id, from, to, label }: CreateEdgeOptions): Edge {
  return {
    id,
    to,
    from,
    label,
  };
}

export type QueryPath = QueryTraversalNode[];

type GetNodesAndEdgesFromAstOutput = {
  nodeIdSet: Set<string>
  edgeIdSet: Set<string>
}

export function getNodesAndEdgesFromAst(
  graph: MultiGraph<NodeAttributes, EdgeAttributes>,
  ast: RootQueryNode
): { unique: GetNodesAndEdgesFromAstOutput, ordered: QueryPath } {
  const queryPath: QueryPath = flattenAst(ast);

  // can we mark parts of the query that are invalid?
  return {
    unique: deriveNodesAndEdgesFromQueryPath(graph, queryPath),
    ordered: queryPath
  }
}

export function flattenAst (ast: RootQueryNode | QueryTraversalNode): QueryPath {
  const queryPath: QueryPath = [];

  let current: RootQueryNode | QueryTraversalNode | undefined = ast;

  while(current) {
    queryPath.push(current as QueryTraversalNode);
    current = current.next;
  }

  return queryPath;
}

function deriveNodesAndEdgesFromQueryPath(
  graph: MultiGraph<NodeAttributes, EdgeAttributes>,
  queryPath: QueryPath
) {
  if (queryPath.length === 1) {
    const nodeIdSet = new Set<string>();
    const edgeIdSet = new Set<string>();
    const part = queryPath[0];

    for (const optionalTraversal of part.optionalTraversals ?? []) {
      const optionalQueryPath: QueryPath = [
        { ...part, optionalTraversals: undefined },
        ...flattenAst(optionalTraversal.traversal)
      ];

      const optionalRelationships = collectAllEncounteredNodesAndEdgesFromQueryPath(graph, optionalQueryPath);
      const refinedGraph = refineQueryGraphPaths(optionalRelationships);
      addAllToSet(nodeIdSet, [...refinedGraph.nodeIdSet.values()]);
      addAllToSet(edgeIdSet, [...refinedGraph.edgeIdSet.values()]);
    }

    const nodeIds = getClassesAndTypesForAstNode(graph, part);

    addAllToSet(
      nodeIdSet,
      nodeIds
    );

    return {
      nodeIdSet,
      edgeIdSet
    };
  } else {
    const graphData = collectAllEncounteredNodesAndEdgesFromQueryPath(graph, queryPath)
    return refineQueryGraphPaths(graphData);
  }
}

function collectAllEncounteredNodesAndEdgesFromQueryPath(
  graph: MultiGraph<NodeAttributes, EdgeAttributes>,
  queryPath: QueryPath
) {
  let encounteredNodeIdSet = new Set<string>();
  const edgeMap = new Map<string, [string, string]>();

  let previousIterationEncounteredNodeIdSet: Set<string> | undefined;

  for (let i = 0; i < queryPath.length; i++) {
    const currentIterationEncounteredNodeIdSet = new Set<string>()

    const currentPathPart = queryPath[i];

    const previousNode = queryPath[i - 1]
    const nextNode = queryPath[i + 1]

    // safety check, if the prev and next path parts are not nodes,
    // something's wrong, just skip for now.
    if (previousNode?.target !== 'entities' || nextNode?.target !== 'entities') {
      continue;
    }

    let previousNodeIdentifiers = getClassesAndTypesForAstNode(graph, previousNode);

    if (previousIterationEncounteredNodeIdSet) {
      // to improve performance, narrow down the number of entities we need to
      // find neighbors for
      previousNodeIdentifiers = previousNodeIdentifiers
        .filter(id => previousIterationEncounteredNodeIdSet?.has(id))
    }

    // to match query lang behavior, only work with
    // nodes we have not already encountered
    const nextNodeIdentifiers = getClassesAndTypesForAstNode(graph, nextNode)
      .filter(id => !encounteredNodeIdSet.has(id));

    for (const optionalTraversal of previousNode.optionalTraversals ?? []) {
      const optionalQueryPath: QueryPath = [
        { ...previousNode, optionalTraversals: undefined },
        ...flattenAst(optionalTraversal.traversal)
      ];

      const optionalRelationshipData = collectAllEncounteredNodesAndEdgesFromQueryPath(graph, optionalQueryPath);

      // ensure that we account the ending identifiers when building out the
      // next hop
      previousNodeIdentifiers = previousNodeIdentifiers.concat(
        optionalRelationshipData.endingIdentifiers
      );

      addAllToSet(encounteredNodeIdSet, [
        ...optionalRelationshipData.encounteredNodeIdSet.values()
      ]);

      addAllToSet(currentIterationEncounteredNodeIdSet, [
        ...optionalRelationshipData.encounteredNodeIdSet.values()
      ]);

      addAllToMap(edgeMap, [
        ...optionalRelationshipData.edgeMap.entries()
      ]);
    }

    const nodePairs = cartesian([
      previousNodeIdentifiers,
      nextNodeIdentifiers
    ]);

    const edgeClassesAndTypes = getClassesAndTypesForAstNode(graph, currentPathPart);

    const isAnyNodeRelationship = edgeClassesAndTypes.length === 0;

    const relationshipSet = new Set<string>(
      edgeClassesAndTypes
        .map(id => id.toUpperCase())
    );

    const isValidRelationship = isAnyNodeRelationship
      ? (_relationship: string) => true
      : (relationship: string) => relationshipSet.has(relationship);

    for (const [left, right] of nodePairs) {
      const { nodeIds, edgeIds } = getMatchingNodesAndEdgesFromNodePair({
        graph,
        relationshipNode: currentPathPart,
        pair: [left, right],
        isValidRelationship
      });

      addAllToSet(encounteredNodeIdSet, nodeIds);
      addAllToSet(currentIterationEncounteredNodeIdSet, nodeIds);

      for (const edgeId of edgeIds) {
        edgeMap.set(edgeId, [left, right]);
      }
    }

    previousIterationEncounteredNodeIdSet = currentIterationEncounteredNodeIdSet;
  }

  return {
    encounteredNodeIdSet,
    edgeMap,
    startingIdentifiers: getClassesAndTypesForAstNode(graph, queryPath[0])
      .filter(id => encounteredNodeIdSet.has(id)),
    endingIdentifiers: previousIterationEncounteredNodeIdSet
      ? [...previousIterationEncounteredNodeIdSet.values()]
      : []
  }
}

function getClassesAndTypesForAstNode(
  graph: MultiGraph<NodeAttributes, EdgeAttributes>,
  node: QueryTraversalNode,
) {
  const classesAndTypes = [...(node.types ?? []), ...(node.classes ?? [])]
  if (node.target === 'entities') {
    return classesAndTypes.length === 0
      ? graph.nodes()
      : classesAndTypes.flatMap(classOrType => {
        if (classOrType[0] === classOrType[0].toUpperCase()) {
          return (classTypeMappings as any).byClass[classOrType] ?? [];
        } else {
          return classOrType;
        }
      })
  } else {
    return classesAndTypes;
  }
}

type RefineQueryGraphInput = {
  encounteredNodeIdSet: Set<string>;
  edgeMap: Map<string, [string, string]>;
  startingIdentifiers: string[];
  endingIdentifiers: string[];
}

function refineQueryGraphPaths({
  edgeMap,
  startingIdentifiers,
  endingIdentifiers
}: RefineQueryGraphInput) {
  // need to remove nodes and edges that are not in the final path
  // find aws_iam that relates to aws_iam_user that relates to * that relates to aws_iam_policy
  const intermediateGraph = new Graph();

  const reverseEdgeLookup = new Map<string, string[]>();
  const getReverseEdgeLookupPairingKey =
    (pair: [string, string]) => pair.sort().join('--');

  for (const [edgeId, pair] of edgeMap.entries()) {
    intermediateGraph.mergeEdge(pair[0], pair[1]);
    const pairingKey = getReverseEdgeLookupPairingKey(pair);
    const existingEntry = reverseEdgeLookup.get(edgeId);
    if (existingEntry) {
      reverseEdgeLookup.set(pairingKey, [...existingEntry, edgeId]);
    } else {
      reverseEdgeLookup.set(pairingKey, [edgeId])
    }
  }

  const startEndPairs = cartesian([
    startingIdentifiers,
    endingIdentifiers
  ])

  const simplePaths =
    startEndPairs.flatMap(
      ([start, end]: [string, string]) => {
        return allSimplePaths(intermediateGraph, start, end)
      }
    )

  const nodeIdSet = new Set<string>();
  const edgeIdSet = new Set<string>()
  for (let i = 0; i < simplePaths.length; i++) {
    const path = simplePaths[i]
    for (let j = 0; j < path.length; j++) {
      // groupings can be easily created here
      nodeIdSet.add(path[j]);

      if (j > 0) {
        const pairingKey = getReverseEdgeLookupPairingKey([path[j], path[j - 1]])
        const associatedEdges = reverseEdgeLookup.get(pairingKey);
        if (associatedEdges) {
          addAllToSet(edgeIdSet, associatedEdges)
        }
      }
    }
  }

  return {
    nodeIdSet,
    edgeIdSet,
  }
}

type GetMatchingNodesAndEdgesInput = {
  graph: MultiGraph<NodeAttributes, EdgeAttributes>;
  relationshipNode: QueryTraversalNode;
  pair: [string, string];
  isValidRelationship: (rel: string) => boolean;
}

function getMatchingNodesAndEdgesFromNodePair ({
  graph,
  relationshipNode,
  pair,
  isValidRelationship,
}: GetMatchingNodesAndEdgesInput) {
  const [previousNodeIdentifier, nextNodeIdentifier] = pair;

  let nodeIds: string[] = [];
  let edgeIds: string[] = [];

  const { direction } = relationshipNode;

  const outboundEdgeIds = direction === 'out' || direction === 'both'
    ? graph.filterOutboundEdges(
        previousNodeIdentifier,
        (_edge, attributes, _source, target) => {
          return target === nextNodeIdentifier && isValidRelationship(attributes.type)
        }
      )
    : [];
  edgeIds = edgeIds.concat(outboundEdgeIds);

  const inboundEdgeIds = direction === 'in' || direction === 'both'
    ? graph.filterInboundEdges(
      previousNodeIdentifier,
      (_edge, attributes, source, _target) => {
        return source === nextNodeIdentifier && isValidRelationship(attributes.type)
      }
    )
    : [];
  edgeIds = edgeIds.concat(inboundEdgeIds);

  if (edgeIds.length) {
    nodeIds.push(previousNodeIdentifier);
    nodeIds.push(nextNodeIdentifier);
  }

  return {
    nodeIds,
    edgeIds
  }
}

function addAllToMap(map: Map<string, [string, string]>, entries: [string, [string, string]][]) {
  for (const [key, pair] of entries) {
    map.set(key, pair);
  }
}

function addAllToSet(set: Set<string>, values: string[]) {
  for (const value of values) {
    set.add(value);
  }
}
