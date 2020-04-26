import React, {useMemo, useContext} from 'react'
import {
  Typography,
  Paper,
  Icon,
  Box,
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import {useHistory} from 'react-router-dom'
import filterQuestions, {FilterType} from '../methods/filterQuestions'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useWindowSize } from "@reach/window-size";
import Context from '../AppContext'

interface Props {
  // managedQuestions: ManagedQuestionJSON;
  // integrations: string[];
  // tags: string[];
  // center?: boolean | undefined;
  // search: string;
  // filter: string;
  // allCategories: string[];
  // categories: string[];
}

const QuestionsDisplay = () => {
  console.log('QuestionsDisplay')
  const {managedQuestions, integrations, tags, search, tagFilter, categories, allCategories} = useContext(Context)
  const classes = useQuestionDisplayStyles()
  const history = useHistory()
  const windowSize = useWindowSize()

  const filteredQuestions : Question[] = useMemo(() => filterQuestions(
    managedQuestions.questions,
    integrations,
    tags,
    search,
    (tagFilter === 'any') ? FilterType.ANY : FilterType.ALL,
    categories
  ), [managedQuestions, integrations, tags, search, tagFilter, categories])

  return (
    <Paper elevation={0} className={windowSize.width > 750 ? classes.root : classes.smallRoot} >
      <Box style={{textAlign: 'right'}} mr={1} mb={-3}>
        <em>{filteredQuestions.length} of {managedQuestions.questions.length}</em>
      </Box>
      {filteredQuestions.length !== 0 ?
        (
          <div>
            {[...allCategories, undefined].map(category =>
              <div>
                {filteredQuestions.filter(question =>
                  question.category === category
                ).length !== 0 ?
                  <Box m={1} mt={2}>
                    <Typography variant='h6'>{category === undefined ? 'No Category' : category}</Typography>
                  </Box>
                : (
                  null
                )}

                {filteredQuestions.filter(question =>
                  question.category === category
                ).map((question: Question, index: number) => (
                  <div>
                    <Box key={index} onClick={() => history.push(`/question/${question.hash}`)} style={{display: 'flex'}}>
                      <span className={classes.item}>
                        {question.title}
                      </span>
                      <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                    </Box>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Box m={1}><strong>No results.</strong></Box>
        )
      }
    </Paper>
  )
}

export default React.memo(QuestionsDisplay);
