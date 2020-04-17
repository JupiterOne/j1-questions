import React from 'react';
import './App.css';
// import {} from 'react-router-dom'
import QuestionsDisplay from './components/QuestionsDisplay'
import Filters from './components/Filters'
import uniqueArray from './methods/uniqueArray'
import {
  Box
} from '@material-ui/core'

const Main = (props : any) => {
  return (
    <Box mt={2} style={{display: 'flex'}}>
      <Filters
        managedQuestions={props.fetchedQuesitons}
        allTags={props.allTags}
        integration={props.integration}
        integrationClicked={props.setIntegration}
        tags={props.tags}
        search={props.search}
        tagCheckClicked={(tag: string, checked : boolean) => {
          props.setTags((prev: any) => {
            if (!checked) {
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
      <QuestionsDisplay integration={props.integration} tags={props.tags} managedQuestions={props.fetchedQuesitons} search={props.search}/>
    </Box>
  )
}

export default Main;
