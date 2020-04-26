import React, {useState, useContext} from 'react'
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
import {Question} from '../types'
import hash from 'hash.js'
import copy from 'clipboard-copy'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Context from '../AppContext'

const QuestionDisplay = () => {
  const {managedQuestions} = useContext(Context)
  const [copied, setCopied] = useState(false)
  const params : {questionTitle?: string} = useParams()
  const history = useHistory()
  const classes = useQuestionStyles()
  const title : string = (params.questionTitle !== undefined) ? (
    params.questionTitle
  ) : ''

  const question : Question = managedQuestions.questions.filter((question : Question) => {
    return (
      hash.sha1().update(question.title).digest('hex') === title
    )
  })[0]

  return (
    <>
      <Button color='secondary' className={classes.button} variant='contained' onClick={() => {
        history.goBack()
      }}> <ArrowBackIosIcon/> Back</Button>
      <Paper elevation={0} className={classes.root}>
        {question ? (
          <div>
            <Box className={classes.title}>
              <Typography variant='h6' className={classes.titleText}>{question.title}</Typography>
              {question.tags === undefined || question.tags.map((tag: string) => <Chip key={tag} className={classes.tag} variant="outlined" color='secondary' onClick={() => {
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
                <Box key={query.query} mt={2} m={0}>
                  <IconButton color='primary' onClick={() => {
                    copy(query.query)
                    setCopied(true)
                  }} children={<LibraryBooksIcon/>}/>
                  <code className={classes.queryBox}>{query.query}</code>
                </Box>
                ))
              }
            </Box>
            <Box>
              {question.integration ? (
                <div>
                  <Typography>Integration: <Chip variant='outlined' color='primary' onClick={() => {
                    history.push(`/filter?&integration=${question.integration}`)
                  }}label={question.integration} /></Typography>
                </div>
              ) : null}
            </Box>
            <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)}>
              <Alert severity="success">
                Query copied to clipboard.
              </Alert>
            </Snackbar>
          </div>
        ) : <div>Nothing to display.</div>}
      </Paper>
    </>
  )
}

export default QuestionDisplay;
