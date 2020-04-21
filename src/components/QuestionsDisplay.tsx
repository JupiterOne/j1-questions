import React, {useMemo} from 'react'
import {
  Divider,
  Paper,
  Icon,
  Button,
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import {useHistory} from 'react-router-dom'
import filterQuestions from '../methods/filterQuestions'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integration: string;
  tags: string[];
  center?: boolean | undefined;
  search: string;
  questionNumber: number;
  setQuestionNumber: Function;
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()
  const history = useHistory()

  console.log('Header rendered')

  const filteredQuestions : Question[] = useMemo(() => filterQuestions(
    props.managedQuestions.questions,
    props.integration,
    props.tags,
    props.search,
    props.questionNumber
  ), [props])

  return (
    <Paper className={classes.root} style={{margin: props.center ? 'auto' : ''}}>
      {filteredQuestions.length !== 0 ?
        (
          <div>
            {filteredQuestions.map((question: Question, index: number) => {
              return (
                <div key={index} onClick={() => history.push(`/question/${question.hash}`)} style={{display: 'flex'}}>
                  <span className={classes.item}>{question.title}</span>
                  <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                  <Divider/>
                </div>
              )})
            }
            {(props.questionNumber < props.managedQuestions.questions.length && !(props.integration !== 'none' || props.tags.length !== 0 || props.search !== '')) ? (
              <Button color='primary' variant='contained' onClick={() => props.setQuestionNumber((num: number) => num + 10)}>Load more</Button>
            ) : null}
          </div>
        ) : (
          <i>No results.</i>
        )
      }
    </Paper>
  )
}

export default React.memo(QuestionsDisplay);
