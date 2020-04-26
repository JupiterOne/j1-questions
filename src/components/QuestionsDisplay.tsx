import React, {useMemo} from 'react'
import {
  Typography,
  Card,
  Icon,
  Box,
  Divider,
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import {useHistory} from 'react-router-dom'
import filterQuestions, {FilterType} from '../methods/filterQuestions'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useWindowSize } from "@reach/window-size";

import groupBy from 'lodash/groupBy';

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrations: string[];
  tags: string[];
  center?: boolean | undefined;
  search: string;
  filter: string;
  allCategories: string[];
  categories: string[];
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()
  const history = useHistory()
  const windowSize = useWindowSize()

  const filteredQuestions : Question[] = filterQuestions(
    props.managedQuestions.questions,
    props.integrations,
    props.tags,
    props.search,
    (props.filter === 'any') ? FilterType.ANY : FilterType.ALL,
    props.categories
  )

  if (filteredQuestions.length === 0) {
    return (
      <Card elevation={0} className={windowSize.width > 750 ? classes.root : classes.smallRoot} style={{margin: props.center ? 'auto' : ''}}>
        <Box style={{textAlign: 'right'}} mr={1} mb={-3}>
          <em>{filteredQuestions.length} of {props.managedQuestions.questions.length}</em>
        </Box>
        <Box m={1}><strong>No results.</strong></Box>
      </Card>
    )
  }

  const grouped = groupBy(filteredQuestions, 'category');

  return (
    <Card
      elevation={0}
      className={windowSize.width > 750 ? classes.root : classes.smallRoot}
      style={{margin: props.center ? 'auto' : ''}}
    >
      <Box style={{textAlign: 'right'}} mr={1} mb={-3}>
        <em>{filteredQuestions.length} of {props.managedQuestions.questions.length}</em>
      </Box>
        {Object.keys(grouped).map((category, index) => (
          <div>
            <Box m={1} mt={2}>
              <Typography variant='h6'>{category === 'undefined' ? 'No Category' : category}</Typography>
            </Box>

            {
              grouped[category].map((question, questionIndex) => (
                <>
                  <Box key={index} onClick={() => history.push(`/question/${question.hash}`)} style={{display: 'flex'}}>
                    <span className={classes.item}>
                      {question.title}
                    </span>
                    <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                  </Box>
                  <Divider/>
                </>
              ))
            }
          </div>
        ))
      }
    </Card>
  )
}

export default React.memo(QuestionsDisplay);
