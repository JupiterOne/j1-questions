import React from 'react'
import {
  Paper,
  IconButton
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import Launch from '@material-ui/icons/Launch';
import {Link} from 'react-router-dom'

interface Props {
  managedQuestions: ManagedQuestionJSON
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()

  console.log(props.managedQuestions)

  return (
    <Paper className={classes.root}>
      {props.managedQuestions.questions.map((question: Question) => {
        return (
          <Paper style={{display: 'flex', marginBottom: '0.5%', padding: '0.5%'}}>
            <div className={classes.item}>{question.title}</div>
            <Link to={`/question/${question.title}`}>
              <IconButton color='primary'>
                <Launch/>
              </IconButton>
            </Link>
          </Paper>
        )
      })}
    </Paper>
  )
}

export default QuestionsDisplay;
