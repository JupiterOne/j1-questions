import { Node as VisNode, Edge as VisEdge } from "vis-network";

export type Node = Exclude<VisNode, 'id'> & { id: string };
export type Edge = Exclude<VisEdge, 'id' | 'to' | 'from' | 'label'> & { id: string; to: string; from: string; label: string };

export type PathSelection = {
  order: number;
  type: "node" | "edge";
  id: string;
}

export type NodeNeighbor = {
  nodeId: string;
  edge: Edge;
  neighborId: string;
  direction: '<<' | '>>';
}

export type TraversalType = 'optional' | 'normal';
