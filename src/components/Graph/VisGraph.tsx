import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import intersectionWith from "lodash/intersectionWith";
import { DataSet } from "vis-data";
import { Network, NetworkEvents, Options } from "vis-network";
import { Node, Edge } from './types';

export type GraphEvent = {
  pointer: {
    canvas: {
      x: number;
      y: number;
    },
    DOM: {
      x: number;
      y: number;
    }
  },
  event: {
    center: {
      x: number;
      y: number
    }
  };
  nodes: string[];
  edges: Edge[];
  previousSelection?: {
    nodes: Node[];
    edges: Edge[]
  }
}

export type GraphEventHandler = (event: GraphEvent) => void;

export type GraphEventHandlers = Partial<Record<NetworkEvents, GraphEventHandler>>;

type Item = Edge | Node;

type GraphProps = {
  graph: {
    edges: Edge[];
    nodes: Node[];
  },
  style?: object,
  getNetwork?: Function,
  getNodes?: Function,
  getEdges?: Function,
  identifier?: string,
  events?: GraphEventHandlers;
  options?: Options;
}

type GraphState = {
  identifier: string;
}

const diff = <T extends Edge | Node>(current: T[], next: T[], field: keyof T = "id") => {
  // consider caching this value between updates
  const nextIds = new Set(next.map((item) => item[field]));
  const removed = current.filter((item) => !nextIds.has(item[field]));

  const unchanged = intersectionWith(next, current, isEqual);

  const updated = differenceWith(
    intersectionWith(next, current, (a, b) => a[field] === b[field]),
    unchanged,
    isEqual
  );

  const added = differenceWith(
    differenceWith(next, current, isEqual),
    updated,
    isEqual
  );

  return {
    removed,
    unchanged,
    updated,
    added,
  };
};


class VisGraph extends Component<GraphProps, GraphState> {
  private network: Network | undefined;
  private edges: DataSet<Edge>;
  private nodes: DataSet<Node>;
  private container: React.RefObject<HTMLElement>;

  constructor(props: GraphProps) {
    super(props);
    const { identifier } = props;
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      identifier: identifier !== undefined ? identifier : uuid()
    };
    this.edges = new DataSet<Edge>();
    this.nodes = new DataSet<Node>();
    this.container = React.createRef<HTMLElement>();
  }

  componentDidMount() {
    this.edges.add(this.props.graph.edges);
    this.nodes.add(this.props.graph.nodes);
    this.updateGraph();
  }

  shouldComponentUpdate(nextProps: GraphProps) {
    let nodesChange = !isEqual(this.props.graph.nodes, nextProps.graph.nodes);
    let edgesChange = !isEqual(this.props.graph.edges, nextProps.graph.edges);
    let optionsChange = !isEqual(this.props.options, nextProps.options);
    let eventsChange = !isEqual(this.props.events, nextProps.events);

    if (nodesChange) {
      const idIsEqual = (n1: Item, n2: Item) => n1?.id === n2?.id;
      const nodesRemoved = differenceWith(this.props.graph.nodes, nextProps.graph.nodes, idIsEqual);
      const nodesAdded = differenceWith(nextProps.graph.nodes, this.props.graph.nodes, idIsEqual)
      const nodesChanged = differenceWith(
        differenceWith(nextProps.graph.nodes, this.props.graph.nodes, isEqual),
        nodesAdded
      );
      this.patchNodes({ nodesRemoved, nodesAdded, nodesChanged });
    }

    if (edgesChange) {
      const {
        removed: edgesRemoved,
        added: edgesAdded,
        updated: edgesChanged,
      } = diff(this.props.graph.edges, nextProps.graph.edges);

      this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
    }

    if (optionsChange && this.network) {
      this.network.setOptions(nextProps.options ?? {});
    }

    if (eventsChange) {
      let events = this.props.events || {};
      for (let eventName in events) {
        if (this.network) {
          this.network.off(eventName as NetworkEvents, events[eventName as NetworkEvents]);
        }
      }

      events = nextProps.events || {};
      for (let eventName in events) {
        if (this.network) {
          this.network.on(eventName as NetworkEvents, events[eventName as NetworkEvents] as GraphEventHandler);
        }
      }
    }

    return false;
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  patchEdges({ edgesRemoved, edgesAdded, edgesChanged }: { edgesRemoved: Edge[], edgesAdded: Edge[], edgesChanged: Edge[] }) {
    this.edges.remove(edgesRemoved);
    this.edges.update(edgesAdded);
    this.edges.update(edgesChanged);
  }

  patchNodes({ nodesRemoved, nodesAdded, nodesChanged }: { nodesRemoved: Node[], nodesAdded: Node[], nodesChanged: Node[] }) {
    this.nodes.remove(nodesRemoved);
    this.nodes.update(nodesAdded);
    this.nodes.update(nodesChanged);
  }

  updateGraph() {
    let defaultOptions = {
      physics: {
        // stabilization: false
      },
      // autoResize: true,
      edges: {
        smooth: false,
        color: "#000000",
        width: 0.5,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      }
    };

    // merge user provied options with our default ones
    let options = defaultsDeep(defaultOptions, this.props.options);
    this.network = new Network(
      this.container.current as HTMLElement,
      Object.assign({}, this.props.graph, {
        edges: this.edges,
        nodes: this.nodes
      }),
      options
    );

    if (this.props.getNetwork) {
      this.props.getNetwork(this.network);
    }

    if (this.props.getNodes) {
      this.props.getNodes(this.nodes);
    }

    if (this.props.getEdges) {
      this.props.getEdges(this.edges);
    }

    // Add user provied events to network
    let events = this.props.events || {};
    for (let eventName in events) {
      this.network.on(eventName as NetworkEvents, events[eventName as NetworkEvents] as GraphEventHandler);
    }
  }

  render() {
    const { identifier } = this.state;
    const { style } = this.props;
    return React.createElement(
      "div",
      {
        id: identifier,
        ref: this.container,
        style
      },
      identifier
    );
  }
}

export default VisGraph;

