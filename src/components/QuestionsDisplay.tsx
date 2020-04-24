import React, {useMemo} from 'react'
import {
  // Chip,
  Typography,
  Paper,
  Icon,
  Box
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import {useHistory} from 'react-router-dom'
import filterQuestions, {FilterType} from '../methods/filterQuestions'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integration: string;
  tags: string[];
  center?: boolean | undefined;
  search: string;
  filterLogic: string;
  allCategories: string[];
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()
  const history = useHistory()

  const filteredQuestions : Question[] = useMemo(() => filterQuestions(
    props.managedQuestions.questions,
    props.integration,
    props.tags,
    props.search,
    (props.filterLogic === 'or') ? FilterType.ANY : FilterType.ALL
  ), [props])

  return (
    <Paper elevation={0} className={classes.root} style={{margin: props.center ? 'auto' : ''}}>
      {filteredQuestions.length !== 0 ?
        (
          <div>
            {[...props.allCategories, undefined].map(category =>
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
                ).map((question: Question, index: number) =>
                  <div key={index} onClick={() => history.push(`/question/${question.hash}`)} style={{display: 'flex'}}>
                    <span className={classes.item}>
                      {question.title}
                      <div>
                        {/* question.tags ? question.tags.map(tag => <Chip className={classes.chip} label={tag}/>) : null */}
                      </div>
                    </span>
                    <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <i>No results.</i>
        )
      }
    </Paper>
  )
}

export default React.memo(QuestionsDisplay);
