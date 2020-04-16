import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import QuestionsDisplay from './components/QuestionsDisplay'
import QuestionDisplay from './components/QuestionDisplay'
import Filters from './components/Filters'
import fetchQuestions from './methods/fetchQuestions'
import uniqueArray from './methods/uniqueArray'
import {ManagedQuestionJSON, Question} from './types'

import theme from './theme'
import {ThemeProvider} from '@material-ui/core/styles'
import {
  Container,
  Box
} from '@material-ui/core'

const intialState = {
  integrations: {
  },
  questions: [
    {
      compliance: [
        {
          standard: 'string'
        }
      ],
      description: 'description',
      title: 'title',
      queries: [
        {
          query: 'query',
        }
      ],
      tags: ['tag']
    }
  ]
}

function App() {
  const [fetchedQuesitons, setFetchedQuestions] = useState(intialState)
  const [integration, setIntegration] = useState('none')
  const [allTags, setAllTags] = useState(['tag'])
  const [tags, setTags] = useState([])

  useEffect(() => {
    fetchQuestions().then((r : ManagedQuestionJSON) => {
      const tags : string[] = r.questions.map((question : Question) => {
        return question.tags
      }).flat(2)
      setAllTags([])
      setAllTags(uniqueArray(tags))

      return setFetchedQuestions(r)
    })
  }, [])

  console.log(tags)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header/>
        <Container maxWidth="lg">
          <Switch>

            <Route exact path='/'>
              <Box mt={2} style={{display: 'flex'}}>
                <Filters
                  managedQuestions={fetchedQuesitons}
                  allTags={allTags}
                  integration={integration}
                  integrationClicked={setIntegration}
                  tags={tags}
                  tagCheckClicked={(tag: string, checked : boolean) => {
                    setTags((prev: any) => {
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
                <QuestionsDisplay integration={integration} tags={tags} managedQuestions={fetchedQuesitons}/>
              </Box>
            </Route>
            <Route exact path='/question/:questionTitle'>
              <QuestionDisplay managedQuestions={fetchedQuesitons}/>
            </Route>

          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
