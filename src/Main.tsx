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
  if (typeof params.integrations !== 'string') {
    params.integrations = ''
  }
  if (typeof params.tags !== 'string') {
    params.tags = ''
  }
  if (typeof params.tagFilter !== 'string') {
    params.tagFilter = ''
  }

  const [integrations, setIntegrations] = useState<string[]>((params.integrations !== '') ? params.integrations.split(',') : [])
  const [tags, setTags] = useState<string[]>((params.tags !== '') ? params.tags.split(',') : [])
  const [tagFilter, setFilterLogic] = useState<string>((params.tagFilter !== '') ? params.tagFilter : 'all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {

    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integrations.length !== 0) ? `&integrations=${integrations.join(',')}` : "")
      + ((props.search !== '') ? `&search=${props.search}` : "")
      + ((tagFilter !== '') ? `&tagFilter=${tagFilter}` : "")

    history.replace(searchString)

  }, [tags, integrations, props.search, tagFilter, categories])

  return (
    <>
      <Box mt={2} style={{display: windowSize.width > 750 ? 'flex' : 'block'}}>
        <Filters
          managedQuestions={props.managedQuestions}
          allTags={props.allTags}
          integrations={integrations}
          integrationClicked={(integration: string) => {
            setIntegrations((prev: string[]) => {
              if (prev.includes(integration)) {
                const index = prev.indexOf(integration);
                if (index > -1) {
                  prev.splice(index, 1);
                }
              } else {
                prev.push(integration)
              }
              prev = uniqueArray(prev)
              return prev
            })
          }}
          tags={tags}
          filter={tagFilter}
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
          integrations={integrations}
          tags={tags}
          managedQuestions={props.managedQuestions}
          search={props.search}
          filter={tagFilter}
          allCategories={props.allCategories}
          categories={categories}
        />
      </Box>
    </>
  )
}

export default Main;
