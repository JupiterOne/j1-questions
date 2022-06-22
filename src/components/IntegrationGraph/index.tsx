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
    integrationSchemaMap,
    integrationTypeToIdMap
  } = useContext(Context);

  const windowSize = useWindowSize();
  const classes = useIntegrationGraphStyles();

  const [{ nodes, edges}, setNodesAndEdges] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({ nodes: [], edges: []});

  console.log({ nodes, edges })

  useEffect(() => {
    const schemas = integrations.map(type => {
      const id = integrationTypeToIdMap.get(type);
      return id ? integrationSchemaMap.get(id) : undefined;
    })
      .filter((schema): schema is IntegrationSchema => schema !== undefined);

    const entities = schemas.flatMap(schema => schema.integration.entities);
    const relationships = schemas.flatMap(schema => schema.integration.relationships);

    setNodesAndEdges({
      nodes: convertEntitiesToNodes(entities),
      edges: convertRelationshipsToEdges(relationships)
    });
  }, [integrations, integrationSchemaMap])

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

export default IntegrationGraph;
