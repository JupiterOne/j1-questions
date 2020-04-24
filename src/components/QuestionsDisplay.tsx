import React, {useMemo} from 'react'
import {
  Chip,
  Paper,
  Icon
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
            {filteredQuestions.map((question: Question, index: number) => {
              return (
                <div key={index} onClick={() => history.push(`/question/${question.hash}`)} style={{display: 'flex'}}>
                  <span className={classes.item}>
                    {question.title}
                    <div>
                      {/* question.tags ? question.tags.map(tag => <Chip className={classes.chip} label={tag}/>) : null */}
                    </div>
                  </span>
                  <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                </div>
              )})
            }
          </div>
        ) : (
          <i>No results.</i>
        )
      }
    </Paper>
  )
}

export default React.memo(QuestionsDisplay);
