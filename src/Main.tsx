import React, {useEffect, useContext} from 'react';
import './App.css';
import {useHistory} from 'react-router-dom'
import QuestionsDisplay from './components/QuestionsDisplay'
import Filters from './components/Filters'
import uniqueArray from './methods/uniqueArray'
import {
  Box,
  Zoom,
} from '@material-ui/core'
import { useWindowSize } from "@reach/window-size";
import Context from './AppContext'


// interface Props {
//   managedQuestions: ManagedQuestionJSON;
//   allTags: string[];
//   search: string;
//   allCategories: string[];
// }

const Main = () => {
  const {tags, integrations, search, tagFilter, categories, setIntegrations, setCategories, managedQuestions, setTags} = useContext(Context)
  const history = useHistory()
  const windowSize = useWindowSize()

  const handleChangeInMultiOptions = (option: string, setOptions : Function) => {
    setOptions((prev: string[]) => {
      if (prev.includes(option)) {
        const index = prev.indexOf(option);
        if (index > -1) {
          prev.splice(index, 1);
        }
      } else {
        prev.push(option)
      }
      prev = uniqueArray(prev)
      return prev
    })
  }

  useEffect(() => {

    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integrations.length !== 0) ? `&integrations=${integrations.join(',')}` : "")
      + ((search !== '') ? `&search=${search}` : "")
      + (`&tagFilter=${tagFilter}`)

    history.replace(searchString)

  }, [tags, integrations, search, tagFilter, categories])

  return (
    <>
      <Zoom in={managedQuestions.questions.length >= 1}>
        <Box mt={2} style={{display: windowSize.width > 750 ? 'flex' : 'block'}}>
          <Filters
            integrationClicked={(integration: string) => handleChangeInMultiOptions(integration, setIntegrations)}
            setCategories={({category} : {category : string}) => handleChangeInMultiOptions(category, setCategories)}
            tagCheckClicked={(tag: string) => handleChangeInMultiOptions(tag, setTags)}/>
          <QuestionsDisplay/>
        </Box>
      </Zoom>
    </>
  )
}

export default Main;
