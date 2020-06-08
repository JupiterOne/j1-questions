import React, { useContext } from "react";
import clsx from "clsx";
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
  const { themeDark } = React.useContext(Context);
  const { managedQuestions } = useContext(Context);
  const classes = useQuestionDisplayStyles();
  const history = useHistory();
  const windowSize = useWindowSize();

  const grouped = groupBy(props.questions, "category");

  return (
    <Card
      elevation={0}
      classes={{
        root: clsx(classes.questionsCard, windowSize.width > 750 ? classes.root : classes.smallRoot)
      }}
    >
      <Box className={clsx(classes.results, themeDark ? classes.resultsDark : undefined)}>
        {props.questions.length} of {managedQuestions.questions.length}
      </Box>
      {Object.keys(grouped).map((category, index) => (
        <>
          <p className={classes.headingBox}>
            <Typography variant="h5" className={classes.heading}>
              {category === "undefined" ? "No Category" : category}
            </Typography>
          </p>
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
        </>
      ))}
    </Card>
  );
};

export default QuestionsDisplay;
