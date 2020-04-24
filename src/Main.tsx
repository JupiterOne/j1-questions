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
}

const Main = (props: Props) => {
  const history = useHistory()

  const params = queryString.parse(history.location.search)
  if (typeof params.integration !== 'string') {
    params.integration = ''
  }
  if (typeof params.tags !== 'string') {
    params.tags = ''
  }
  if (typeof params.filterLogic !== 'string') {
    params.filterLogic = ''
  }

  const [integration, setIntegration] = useState((params.integration === '') ? 'any' : params.integration)
  const [tags, setTags] = useState<string[]>((params.tags !== '') ? params.tags.split(',') : [])
  const [filterLogic, setFilterLogic] = useState<string>((params.filterLogic !== '') ? params.filterLogic : 'and')

  useEffect(() => {
    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integration !== '') ? `&integration=${integration}` : "")
      + ((props.search !== '') ? `&search=${props.search}` : "")
      + ((filterLogic !== '') ? `&filterLogic=${filterLogic}` : "")

    history.replace(searchString)

  }, [tags, integration, props.search, filterLogic])

  return (
    <>
      <Box mt={2} style={{display: 'flex'}}>
        <Filters
          managedQuestions={props.managedQuestions}
          allTags={props.allTags}
          integration={integration === '' ? 'none' : integration}
          integrationClicked={setIntegration}
          tags={tags}
          filterLogic={filterLogic}
          setFilterLogic={setFilterLogic}
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
          filterLogic={filterLogic}
        />
      </Box>
    </>
  )
}

export default Main;
