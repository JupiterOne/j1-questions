import React, {useState} from 'react'
import {
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  Snackbar,
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {useParams, useHistory} from 'react-router'
import {useQuestionStyles} from '../classes'
import {ManagedQuestionJSON, Question} from '../types'
import hash from 'hash.js'
import copy from 'clipboard-copy'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface Props {
  managedQuestions: ManagedQuestionJSON
}

const QuestionDisplay = (props: Props) => {
  const [copied, setCopied] = useState(false)
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
      <Button color='secondary' className={classes.button} variant='contained' onClick={() => {
        history.goBack()
      }}> <ArrowBackIosIcon/> Back</Button>
      <Paper className={classes.root}>
        {question !== undefined ? (
          <div>
            <Box className={classes.title}>
              <Typography variant='h6' className={classes.titleText}>{question.title}</Typography>
              {question.tags.map((tag: string) => <Chip variant="outlined" color='secondary' onClick={() => {
                history.push(`/filter?&tags=${tag}`)
              }} label={tag}/>)}
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
                  <IconButton color='primary' onClick={() => {
                    copy(query.query)
                    setCopied(true)
                  }} children={<LibraryBooksIcon/>}/>
                </Box>
                ))
              }
            </Box>
            <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)}>
              <Alert severity="success">
                Query copied to clipboard.
              </Alert>
            </Snackbar>
          </div>
        ) : <span/>}
      </Paper>
    </>
  )
}

export default QuestionDisplay;
