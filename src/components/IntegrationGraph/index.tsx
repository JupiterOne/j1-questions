import React, { useContext } from "react";
import { useWindowSize } from "@reach/window-size";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "react-feather/dist/icons/chevron-left";

import { useHistory, useLocation } from "react-router-dom";

import Graph from "../Graph";
import Context from "../../AppContext";
import { IntegrationFilters } from "../Filters";

import { useIntegrationGraphStyles } from "./styles";

import { useGraph } from '../../hooks/useGraph';

const IntegrationGraph = () => {
  const {
    managedQuestions,
  } = useContext(Context);

  const windowSize = useWindowSize();
  const history = useHistory();
  const location = useLocation();
  const classes = useIntegrationGraphStyles();

  const { nodes, edges } = useGraph();

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

export default IntegrationGraph;
