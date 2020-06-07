import React, { useState, useContext } from "react";
import {
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  Snackbar,
  Tooltip,
  Container,
  Divider,
} from "@material-ui/core";
import clsx from "clsx";
import { Alert } from "@material-ui/lab";
import { useParams, useHistory } from "react-router";
import { useQuestionStyles } from "../classes";
import { Question } from "../types";
import hash from "hash.js";
import copy from "clipboard-copy";
import CopyIcon from "react-feather/dist/icons/copy";
import ChevronLeftIcon from "react-feather/dist/icons/chevron-left";
import Context from "../AppContext";
import integrationIconPath from "../util/integrationIconPath";

const QuestionDisplay = () => {
  const { themeDark } = React.useContext(Context);
  const { managedQuestions } = useContext(Context);
  const [copied, setCopied] = useState(false);
  const params: { questionTitle?: string } = useParams();
  const history = useHistory();
  const classes = useQuestionStyles();
  const title: string =
    params.questionTitle !== undefined ? params.questionTitle : "";

  const question: Question = managedQuestions.questions.filter(
    (question: Question) => {
      return (
        hash
          .sha1()
          .update(question.title)
          .digest("hex") === title
      );
    }
  )[0];

  return (
    <>
      <Container>
        <Button
          color="primary"
          className={classes.button}
          size="small"
          variant="outlined"
          onClick={() => {
            history.goBack();
          }}
        >
          <ChevronLeftIcon /> Back
        </Button>
        {question ? (
          <div className={classes.container}>
            <Paper elevation={0} className={classes.root}>
              <Box className={classes.title}>
                <Typography variant="h5" className={classes.titleText}>
                  {question.title}
                </Typography>
              </Box>
              <div className={classes.queryDescLayout}>
                <Box className={classes.queries}>
                  <Box  className={clsx(classes.description, themeDark ? classes.descriptionDark : undefined)}>{question.description}</Box>
                  <Divider />
                  {(question.queries || []).map((query: any) => (
                    <>
                      <Box className={classes.queryGroup} key={query.query}>
                        <div className={classes.copyContainer}>
                          <Tooltip title="Copy query">
                            <IconButton
                              color="primary"
                              className={classes.copy}
                              onClick={() => {
                                copy(query.query);
                                setCopied(true);
                              }}
                              children={<CopyIcon />}
                              />
                          </Tooltip>
                        </div>
                        <code className={classes.queryBox}>
                          <pre>{query.query}</pre>
                        </code>
                      </Box>
                      <Divider />
                    </>
                  ))}
                </Box>
              </div>
            </Paper>
            <Paper elevation={0} className={clsx(classes.sidebar, themeDark ? classes.sidebarDark : undefined)}>
              {question.integration ? (
                <div className={classes.integrationGroup}>
                  <img
                    className={classes.integrationIcon}
                    src={integrationIconPath(managedQuestions.integrations[question.integration].type)}
                  />
                  <Typography
                    className={classes.integrationTitle}
                    variant="subtitle1"
                    component="span"
                  >
                    {managedQuestions.integrations[question.integration].title}
                  </Typography>
                </div>
              ) : null}
              <div className={classes.tags}>
                {question.tags === undefined ||
                  question.tags.map((tag: string) => (
                    <Chip
                      key={tag}
                      className={classes.tag}
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.location.replace(
                          `/filter?tags=${tag}&tagFilter=all`
                          );
                        }}
                        label={tag}
                    />
                ))}
              </div>
            </Paper>
            <Snackbar
              open={copied}
              autoHideDuration={3000}
              onClose={() => setCopied(false)}
            >
              <Alert severity="success">Query copied to clipboard</Alert>
            </Snackbar>
          </div>
        ) : (
          <Paper elevation={0} className={classes.root}>Nothing to display.</Paper>
        )}
      </Container>
    </>
  );
};

export default QuestionDisplay;
