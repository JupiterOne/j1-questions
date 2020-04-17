import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import QuestionDisplay from './components/QuestionDisplay'
import Main from './Main'
import fetchQuestions from './methods/fetchQuestions'
import uniqueArray from './methods/uniqueArray'
import {ManagedQuestionJSON, Question} from './types'
import QuestionsDisplay from './components/QuestionsDisplay'

import theme from './theme'
import {ThemeProvider} from '@material-ui/core/styles'
import {
  Container
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
      tags: ['tag'],
    }
  ]
}

function App() {
<<<<<<< HEAD
  const [fetchedQuestions, setFetchedQuestions] = useState<ManagedQuestionJSON>(intialState)
=======
  const [fetchedQuestions, setFetchedQuestions] = useState(intialState)
>>>>>>> a6bbdcecf31fb1ced641a48e2dc335d997840b76
  const [integration, setIntegration] = useState('none')
  const [allTags, setAllTags] = useState(['tag'])
  const [tags, setTags] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchQuestions().then((r : ManagedQuestionJSON) => {
      const tags : string[] = r.questions.map((question : Question) => {
        return question.tags
      }).flat(2)
      setAllTags([])
      setAllTags(uniqueArray(tags))

      setFetchedQuestions(r)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header setSeach={setSearch}/>
        <Container maxWidth="lg">
          <Switch>

            <Route exact path='/'>
              <Main
<<<<<<< HEAD
                managedQuestions={fetchedQuestions}
=======
                fetchedQuestions={fetchedQuestions}
>>>>>>> a6bbdcecf31fb1ced641a48e2dc335d997840b76
                allTags={allTags}
                integration={integration}
                setIntegration={setIntegration}
                setTags={setTags}
                tags={tags}
                search={search}
              />
            </Route>
            <Route exact path='/integration/:integration/tags/:tags/search/:search'component={(props:any) => {
              console.log(props.match.params)
              const params = props.match.params
              return (
<<<<<<< HEAD
                <QuestionsDisplay
                  center
                  integration={params.integration}
                  tags={JSON.parse(params.tags)}
                  search={params.search}
                  managedQuestions={fetchedQuestions}
                />
=======
                <QuestionsDisplay center integration={params.integration} tags={JSON.parse(params.tags)} search={params.search} managedQuestions={fetchedQuestions}/>
>>>>>>> a6bbdcecf31fb1ced641a48e2dc335d997840b76
              )
            }}/>

            <Route exact path='/question/:questionTitle'>
              <QuestionDisplay managedQuestions={fetchedQuestions}/>
            </Route>

          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
