import React from 'react'
import {
  Paper,
  Box,
  Typography,
  Chip
} from '@material-ui/core'
import {useParams} from 'react-router'
import {useQuestionStyles} from '../classes'
import {ManagedQuestionJSON, Question} from '../types'
import hash from 'hash.js'

interface Props {
  managedQuestions: ManagedQuestionJSON
}

const QuestionDisplay = (props: Props) => {
  const params : {questionTitle?: string} = useParams()
  const classes = useQuestionStyles()
  const title : string = (params.questionTitle !== undefined) ? (
    params.questionTitle
  ) : ''

  const question = props.managedQuestions.questions.filter((question : Question) => {
    return (
      hash.sha1().update(question.title).digest('hex') === title
    )
  })[0]

  console.log('question', question)
  return (
    <Paper className={classes.root}>
      {question !== undefined ? (
        <div>
          <Box className={classes.title}>
            <Typography className={classes.titleText}>{question.title}</Typography>
            {question.tags.map((tag: string) => <Chip variant="outlined" color='secondary' label={tag} onClick={console.log}/>)}
          </Box>
          <Box className={classes.description}>
            {question.description}
          </Box>
          <br/>
          <Typography>Queries</Typography>
          <Box m={2}>
            {question.queries !== undefined ? question.queries.map((query : any) => (
              <Box mt={2} m={0}>
                <code key={query.query}>{query.query}</code>
              </Box>
              )) : <span/>
            }
          </Box>
        </div>
      ) : <span/>}
    </Paper>
  )
}

export default QuestionDisplay;
