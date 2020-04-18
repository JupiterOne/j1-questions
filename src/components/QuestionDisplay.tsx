import React from 'react'
import {
  Paper,
  Box,
  Typography,
  Chip,
  Container,
  Button
} from '@material-ui/core'
import {useParams, useHistory} from 'react-router'
import {useQuestionStyles} from '../classes'
import {ManagedQuestionJSON, Question} from '../types'
import hash from 'hash.js'
import Header from '../components/Header'
import copy from 'clipboard-copy'

interface Props {
  managedQuestions: ManagedQuestionJSON
}

const QuestionDisplay = (props: Props) => {
  const params : {questionTitle?: string} = useParams()
  const history = useHistory()
  const classes = useQuestionStyles()
  const title : string = (params.questionTitle !== undefined) ? (
    params.questionTitle
  ) : ''

  const question = props.managedQuestions.questions.filter((question : Question) => {
    return (
      hash.sha1().update(question.title).digest('hex') === title
    )
  })[0]

  return (
    <>
      <Header disabled/>
      <Container maxWidth="lg">
        <Paper className={classes.root}>
          {question !== undefined ? (
            <div>
              <Box className={classes.title}>
                <Typography variant='h6' className={classes.titleText}>{question.title}</Typography>
                {question.tags.map((tag: string) => <Chip variant="outlined" color='secondary' label={tag}/>)}
              </Box>
              <Box className={classes.description}>
                {question.description}
              </Box>
              <br/>
              <Typography>Queries</Typography>
              <Box>
                {(question.queries || []).map((query : any) => (
                  <Box key={query.query} mt={2} m={0} className={classes.queryBox}>
                    <code className={classes.queryBox}>{query.query}</code>
                    <Button color='primary' size='small' onClick={() => copy(query.query)}>Copy</Button>
                  </Box>
                  ))
                }
              </Box>
            </div>
          ) : <span/>}
        </Paper>
        <Button color='secondary' className={classes.button} variant='contained' onClick={() => {
          history.goBack()
        }}> {"<<"} Back</Button>
      </Container>
    </>
  )
}

export default QuestionDisplay;
