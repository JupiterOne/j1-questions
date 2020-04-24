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
import { useWindowSize } from "@reach/window-size";


interface Props {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
  search: string;
  allCategories: string[];
}

const Main = (props: Props) => {
  const history = useHistory()
  const windowSize = useWindowSize()

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
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integration !== '') ? `&integration=${integration}` : "")
      + ((props.search !== '') ? `&search=${props.search}` : "")
      + ((filterLogic !== '') ? `&filterLogic=${filterLogic}` : "")

    history.replace(searchString)

  }, [tags, integration, props.search, filterLogic, categories])

  return (
    <>
      <Box mt={2} style={{display: windowSize.width > 750 ? 'flex' : 'block'}}>
        <Filters
          managedQuestions={props.managedQuestions}
          allTags={props.allTags}
          integration={integration === '' ? 'none' : integration}
          integrationClicked={setIntegration}
          tags={tags}
          filterLogic={filterLogic}
          setFilterLogic={setFilterLogic}
          allCategories={props.allCategories}
          categories={categories}
          setCategories={(props : any) => {
            setCategories((prev: string[]) => {
              if (prev.includes(props.category)) {
                const index = prev.indexOf(props.category);
                if (index > -1) {
                  prev.splice(index, 1);
                }
              } else {
                prev.push(props.category)
              }
              prev = uniqueArray(prev)
              return prev
            })
          }}
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
          allCategories={props.allCategories}
          categories={categories}
        />
      </Box>
    </>
  )
}

export default Main;
