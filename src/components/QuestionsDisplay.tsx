import React from 'react'
import {
  Divider,
  Paper,
  Icon,
  Button,
  Snackbar
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import {Link} from 'react-router-dom'
import filterQuestions from '../methods/filterQuestions'
import hash from 'hash.js'
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

  const filteredQuestions : Question[] = filterQuestions(props.managedQuestions.questions, props.integration, props.tags, props.search, props.questionNumber)

  return (
    <Paper className={classes.root} style={{margin: props.center ? 'auto' : ''}}>
      {filteredQuestions.length !== 0 ?
        (
          <div>
            {filteredQuestions.map((question: Question, index: number) => {
              return (
                <Link key={index} style={{textDecoration: 'none'}} to={`/question/${hash.sha1().update(question.title).digest('hex')}`}>
                  <Paper elevation={0} style={{display: 'flex', marginBottom: '0.5%', padding: '0.5%'}}>
                    <span className={classes.item}>{question.title}</span>
                    <Icon className={classes.arrow}><ArrowForwardIosIcon/></Icon>
                    <Divider/>
                  </Paper>
                </Link>
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

export default QuestionsDisplay;
