import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import QuestionsDisplay from './components/QuestionsDisplay'
import QuestionDisplay from './components/QuestionDisplay'
import Filters from './components/Filters'
import fetchQuestions from './methods/fetchQuestions'
import {ManagedQuestionJSON} from './types'

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

  useEffect(() => {
    fetchQuestions().then((r : ManagedQuestionJSON) => setFetchedQuestions(r))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header/>
        <Container maxWidth="lg">
          <Switch>

            <Route exact path='/'>
              <Box mt={2} style={{display: 'flex'}}>
                <Filters managedQuestions={fetchedQuesitons} integration={integration} integrationClicked={setIntegration}/>
                <QuestionsDisplay integration={integration} managedQuestions={fetchedQuesitons}/>
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
