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
                <Typography className={classes.titleText}>{question.title}</Typography>
                {question.tags.map((tag: string) => <Chip variant="outlined" color='secondary' label={tag}/>)}
              </Box>
              <Box className={classes.description}>
                {question.description}
              </Box>
              <br/>
              <Typography>Queries</Typography>
              <Box m={2}>
                {(question.queries || []).map((query : any) => (
                  <Box mt={2} m={0}>
                    <code key={query.query}>{query.query}</code>
                  </Box>
                  ))
                }
              </Box>
            </div>
          ) : <span/>}
          <Button onClick={() => {
            history.goBack()
          }}>Back</Button>
        </Paper>
      </Container>
    </>
  )
}

export default QuestionDisplay;
