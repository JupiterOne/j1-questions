import React from 'react'
import {
  Paper
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'

interface Props {
  managedQuestions: ManagedQuestionJSON
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()

  console.log(props.managedQuestions)

  return (
    <Paper className={classes.root}>
      {props.managedQuestions.questions.map((question: Question) => {
        return <Paper className={classes.paper}>{question.title}</Paper>
      })}
    </Paper>
  )
}

export default QuestionsDisplay;
