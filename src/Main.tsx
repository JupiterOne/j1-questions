import React, {useEffect, useState} from 'react';
import './App.css';
import {useHistory} from 'react-router-dom'
import QuestionsDisplay from './components/QuestionsDisplay'
import Filters from './components/Filters'
import uniqueArray from './methods/uniqueArray'
import {
  Box,
} from '@material-ui/core'
import {ManagedQuestionJSON} from './types'
import queryString from 'query-string'


interface Props {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
  search: string;
  setSearch: Function;
}

const Main = (props: Props) => {
  const history = useHistory()

  const params = queryString.parse(history.location.search)
  if (typeof params.search !== 'string') {
    params.search = ''
  }
  if (typeof params.integration !== 'string') {
    params.integration = ''
  }
  if (typeof params.tags !== 'string') {
    params.tags = ''
  }

  useEffect(() => {
    console.log(params)
    props.setSearch(params.search)
  }, [])

  const [integration, setIntegration] = useState((params.integration === '') ? 'none' : params.integration)
  const [tags, setTags] = useState<string[]>((params.tags !== '') ? params.tags.split(',') : [])
  const [questionNumber, setQuestionNumber] = useState<number>(10)

  useEffect(() => {
    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integration !== 'none') ? `&integration=${integration}` : "")
      + ((props.search !== '') ? `&search=${props.search}` : "")

    history.replace(searchString)

  }, [tags, integration, props.search])

  return (
    <>
      <Box mt={2} style={{display: 'flex'}}>
        <Filters
          clear={() => {
            setIntegration('none')
            setTags([])
            props.setSearch('')
          }}
          managedQuestions={props.managedQuestions}
          allTags={props.allTags}
          integration={integration === '' ? 'none' : integration}
          integrationClicked={setIntegration}
          tags={tags}
          search={props.search}
          tagCheckClicked={(tag: string) => {
            setTags((prev: any) => {
              if (tags.includes(tag)) {
                const index = prev.indexOf(tag);
                if (index > -1) {
                  prev.splice(index, 1);
                }
              } else {
                prev.push(tag)
              }
              prev = uniqueArray(prev)
              return prev
            })
          }}/>
        <QuestionsDisplay
          integration={integration}
          tags={tags}
          managedQuestions={props.managedQuestions}
          search={props.search}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
        />
      </Box>
    </>
  )
}

export default Main;
