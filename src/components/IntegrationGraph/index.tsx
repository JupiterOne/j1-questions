import React, { useState, useEffect, useContext } from "react";
import { useWindowSize } from "@reach/window-size";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

import Graph from "../Graph";
import { Node, Edge } from '../Graph/types';
import Context from "../../AppContext";
import { IntegrationFilters } from "../Filters";

import { useIntegrationGraphStyles } from "./styles";
import { IntegrationSchema } from "../../types";
import { createEdgeIdFromRelationship } from "../QueryVisualizer/graph";

const IntegrationGraph = () => {
  const {
    managedQuestions,
    integrations,
    integrationSchemaMap
  } = useContext(Context);

  const windowSize = useWindowSize();
  const classes = useIntegrationGraphStyles();

  const [{ nodes, edges}, setNodesAndEdges] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({ nodes: [], edges: []});

  useEffect(() => {
    const schemas = integrations.map(id => integrationSchemaMap.get(id))
      .filter((schema): schema is IntegrationSchema => schema !== undefined);

    const entities = schemas.flatMap(schema => schema.entities);
    const relationships = schemas.flatMap(schema => schema.relationships);

    setNodesAndEdges({
      nodes: convertEntitiesToNodes(entities),
      edges: convertRelationshipsToEdges(relationships)
    });
  }, [integrations])

  return (
    <>
      <Fade in={managedQuestions.questions.length >= 1}>
        <div
          style={{
            display: "flex",
            flexFlow: windowSize.width > 960 ? "row" : "column",
          }}
        >
          <Paper
            elevation={0}
            className={windowSize.width > 750 ? classes.root : classes.smallRoot}
          >
            <IntegrationFilters/>
          </Paper>

          <div
            className={classes.graphContainer}
          >
            <Graph
              nodes={nodes}
              edges={edges}
            />
          </div>
        </div>
      </Fade>
    </>
  );
};

function convertEntitiesToNodes(entities: IntegrationSchema['entities']): Node[] {
  return entities.map(e => ({
    id: e.type,
    label: e.resourceName
  }));
}

function convertRelationshipsToEdges(relationships: IntegrationSchema['relationships']): Edge[] {
  return relationships.map(r => ({
    id: createEdgeIdFromRelationship(r),
    label: r.class,
    from: r.fromEntityType,
    to: r.toEntityType
  }));
}

export default IntegrationGraph;
