import React from "react";
import ReactDOMServer from 'react-dom/server';

import { useWindowSize } from "@reach/window-size";
import { Paper } from "@material-ui/core";

import { useGraphStyles } from "./styles";

import { Node, Edge } from './types';
import VisGraph from './VisGraph';
import GraphNodeIcon from './GraphNodeIcon';

type GraphProps = {
  nodes: Node[];
  edges: Edge[];
};

const DEFAULT_EDGE_COLOR = '#000000';

const DEFAULT_GRAPH_OPTIONS = {
  autoResize: true,
  height: '100%',
  width: '100%',
  layout: {
    randomSeed: Math.random(),
    hierarchical: false,
    improvedLayout: true,
  },
  edges: {
    color: DEFAULT_EDGE_COLOR,
    scaling: {
      min: 200,
      max: 300,
    },
    smooth: {
      enabled: true,
      type: 'dynamic',
      roundness: .5,
    }
  },
  nodes: {
    // physics: false,
  },
  interaction: {
    selectConnectedEdges: false,
    zoomView: true,
  },
  physics: {
    solver: 'forceAtlas2Based',
    stabilization: {
      enabled: true,
      fit: true
    }
  },
}

const Graph = (props: GraphProps) => {
  const { nodes, edges } = props;
  const windowSize = useWindowSize();
  const classes = useGraphStyles();

  const graphOptions = DEFAULT_GRAPH_OPTIONS;

  return (
    <Paper elevation={0} className={windowSize.width > 750 ? classes.root : classes.smallRoot}>
      <VisGraph
        graph={{
          nodes: applyNodeStyling(nodes),
          edges
        }}
        options={graphOptions}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: '#FAFAFA',
          backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGNpcmNsZSBmaWxsPSIjRTdFN0U3IiBjeD0iMjQiIGN5PSIyNCIgcj0iNSIvPjwvc3ZnPg==)',
          backgroundSize: 16,
          backgroundRepeat: 'repeat',
        }}
      />
    </Paper>
  );
};

function applyNodeStyling(nodes: Node[]) {
  return nodes.map(node => ({
    ...node,
    shape: 'image',
    image: convertReactSvgToImageUri(
      GraphNodeIcon({}) // todo perform icon lookup
    )
  }));
}

function convertReactSvgToImageUri(element: any) {
  const svgString = ReactDOMServer.renderToStaticMarkup(element);
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
};

export default Graph;

