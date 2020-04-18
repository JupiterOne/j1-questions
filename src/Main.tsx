import React, {useEffect, useState} from 'react';
import './App.css';
import {useHistory} from 'react-router-dom'
import QuestionsDisplay from './components/QuestionsDisplay'
import Filters from './components/Filters'
import uniqueArray from './methods/uniqueArray'
import {
  Box,
  Container
} from '@material-ui/core'
import {ManagedQuestionJSON} from './types'
import queryString from 'query-string'
import Header from './components/Header'


interface Props {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
}

const Main = (props: Props) => {
  const history = useHistory()

  const params = queryString.parse(history.location.search)
  if (typeof params.integration !== 'string') {
    params.integration = ''
  }
  if (typeof params.search !== 'string') {
    params.search = ''
  }
  if (typeof params.tags !== 'string') {
    params.tags = ''
  }

  const [integration, setIntegration] = useState((params.integration === '') ? 'none' : params.integration)
  const [tags, setTags] = useState<string[]>((params.tags !== '') ? params.tags.split(',') : [])
  const [questionNumber, setQuestionNumber] = useState<number>(10)
  const [search, setSearch] = useState((params.integration === '') ? '' : params.search)

  useEffect(() => {
    history.replace(`/filter?tags=${tags.join(',')}&integration=${(integration !== 'none') ? integration : ''}&search=${search}`)
  }, [tags, integration, search])

  return (
    <>
      <Header setSearch={setSearch}/>
      <Container maxWidth="lg">
        <Box mt={2} style={{display: 'flex'}}>
          <Filters
            clear={() => {
              setIntegration('none')
              setTags([])
              setSearch('')
            }}
            managedQuestions={props.managedQuestions}
            allTags={props.allTags}
            integration={integration === '' ? 'none' : integration}
            integrationClicked={setIntegration}
            tags={tags}
            search={search}
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
            search={search}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
          />
        </Box>
      </Container>
    </>
  )
}

export default Main;
