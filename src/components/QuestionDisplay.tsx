import React from 'react'
import {
  Paper,
} from '@material-ui/core'
import {useParams} from 'react-router'
import {useQuestionStyles} from '../classes'

const QuestionDisplay = () => {
  const params : {questionTitle?: string} = useParams()
  const classes = useQuestionStyles()

  return (
    <Paper className={classes.root}>
      {params.questionTitle}
    </Paper>
  )
}

export default QuestionDisplay;
