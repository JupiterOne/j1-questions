import React, { useState, useEffect, useContext } from "react";
import { useWindowSize } from "@reach/window-size";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "react-feather/dist/icons/chevron-left";

import { useHistory, useLocation } from "react-router-dom";

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
  const history = useHistory();
  const location = useLocation();
  const classes = useIntegrationGraphStyles();

  const [{ nodes, edges}, setNodesAndEdges] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({ nodes: [], edges: []});

  useEffect(() => {
    const schemas = integrations
      .map(type => {
        const id = integrationTypeToIdMap.get(type);
        return id ? integrationSchemaMap.get(id) : undefined;
      })
      .filter((schema): schema is IntegrationSchema => {
        return schema?.integration !== undefined
      });

    const entities = schemas.flatMap(schema => schema.integration.entities);
    const relationships = schemas.flatMap(schema => schema.integration.relationships);

    setNodesAndEdges({
      nodes: convertEntitiesToNodes(entities),
      edges: convertRelationshipsToEdges(relationships)
    });
  }, [integrations, integrationSchemaMap])

  const handleClickBack = () => {
    history.push(`/${location.search}`);
  };

  return (
    <>
      <Button
        color="primary"
        className={classes.backButton}
        size="small"
        variant="outlined"
        onClick={handleClickBack}
      >
        <ChevronLeftIcon /> Back
      </Button>
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
