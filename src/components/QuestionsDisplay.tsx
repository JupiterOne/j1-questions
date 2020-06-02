import React, { useContext } from "react";
import { Typography, Card, Icon, Box, Divider } from "@material-ui/core";
import { Question } from "../types";
import { useQuestionDisplayStyles } from "../classes";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "react-feather/dist/icons/chevron-right";
import { useWindowSize } from "@reach/window-size";
import Context from "../AppContext";

import groupBy from "lodash/groupBy";

interface Props {
  questions: Question[];
}

const QuestionsDisplay = (props: Props) => {
  const { managedQuestions } = useContext(Context);
  const classes = useQuestionDisplayStyles();
  const history = useHistory();
  const windowSize = useWindowSize();

  const grouped = groupBy(props.questions, "category");

  return (
    <Card
      elevation={0}
      className={windowSize.width > 750 ? classes.root : classes.smallRoot}
    >
      <Box style={{ textAlign: "right" }} mr={1} mb={-3}>
        <em>
          {props.questions.length} of {managedQuestions.questions.length}
        </em>
      </Box>
      {Object.keys(grouped).map((category, index) => (
        <div>
          <Box m={1} mt={2}>
            <Typography variant="h6" className={classes.heading}>
              {category === "undefined" ? "No Category" : category}
            </Typography>
          </Box>
          <Divider className={classes.divider}/>
          {grouped[category].map(question => (
            <>
              <div
                className={classes.question}
                key={index}
                onClick={() => history.push(`/question/${question.hash}`)}
              >
                <span className={classes.item}>{question.title}</span>
                <Icon className={classes.chevronRight}>
                  <ChevronRightIcon />
                </Icon>
              </div>
              <Divider className={classes.divider}/>
            </>
          ))}
        </div>
      ))}
    </Card>
  );
};

export default QuestionsDisplay;
