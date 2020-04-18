import React from 'react';
import './App.css';
// import {} from 'react-router-dom'
import QuestionsDisplay from './components/QuestionsDisplay'
import Filters from './components/Filters'
import uniqueArray from './methods/uniqueArray'
import {
  Box
} from '@material-ui/core'
import {ManagedQuestionJSON} from './types'


interface Props {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
  integration: string;
  setIntegration: Function;
  tags: string[];
  setTags: Function;
  search: string;
  questionNumber: number;
  setQuestionNumber: Function;
}

const Main = (props : Props) => {
  return (
    <Box mt={2} style={{display: 'flex'}}>
      <Filters
        managedQuestions={props.managedQuestions}
        allTags={props.allTags}
        integration={props.integration}
        integrationClicked={props.setIntegration}
        tags={props.tags}
        search={props.search}
        tagCheckClicked={(tag: string) => {
          props.setTags((prev: any) => {
            if (props.tags.includes(tag)) {
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
        integration={props.integration}
        tags={props.tags}
        managedQuestions={props.managedQuestions}
        search={props.search}
        questionNumber={props.questionNumber}
        setQuestionNumber={props.setQuestionNumber}
      />
    </Box>
  )
}

export default Main;
