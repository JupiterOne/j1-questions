import React from 'react'
import {
  Paper,
  IconButton
} from '@material-ui/core'
import {ManagedQuestionJSON, Question} from '../types'
import {useQuestionDisplayStyles} from '../classes'
import LaunchIcon from '@material-ui/icons/Launch';
import {Link} from 'react-router-dom'
import hash from 'hash.js'

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integration: string;
  tags: string[];
  center?: boolean | undefined;
  search: string;
}

const QuestionsDisplay = (props : Props) => {
  const classes = useQuestionDisplayStyles()

  const filteredQuestions = (
    props.managedQuestions.questions
      .filter((question: Question) => props.integration !== 'none' ? question.integration === props.integration : true)
      .filter((question: Question) => {
        const array : boolean[] = []
        for (let key of props.tags) {
          array.push(question.tags !== undefined ? question.tags.includes(key) : false)
        }
        return !array.includes(false)
      })
      .filter((question: Question) => {
        if (props.search !== 'none') {
          return question.title.includes(props.search.toLocaleLowerCase())
        } else {
          return true
        }
      })
  )

  return (
    <Paper className={classes.root} style={{margin: props.center ? 'auto' : ''}}>
      {filteredQuestions.length !== 0 ?
        (filteredQuestions.map((question: Question, index: number) => {
              return (
                <Paper key={index} style={{display: 'flex', marginBottom: '0.5%', padding: '0.5%'}}>
                  <div className={classes.item}>{question.title}</div>
                  <Link to={`/question/${hash.sha1().update(question.title).digest('hex')}`}>
                    <IconButton color='primary'>
                      <LaunchIcon/>
                    </IconButton>
                  </Link>
                </Paper>
              )
            }
          )
        ) : (
          <i>No results.</i>
        )
      }
    </Paper>
  )
}

export default QuestionsDisplay;
