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
  Container,
  CssBaseline
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
  const [fetchedQuestions, setFetchedQuestions] = useState<ManagedQuestionJSON>(intialState)
  const [integration, setIntegration] = useState('none')
  const [allTags, setAllTags] = useState(['tag'])
  const [tags, setTags] = useState([])
  const [search, setSearch] = useState('')
  const [questionNumber, setQuestionNumber] = useState<number>(10)

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
        <CssBaseline/>
        <Header setSeach={(prop : string) => {
          setSearch(prop)
          setTags([])
          setIntegration('none')
        }}/>
        <Container maxWidth="lg">
          <Switch>

            <Route exact path='/'>
              <Main
                managedQuestions={fetchedQuestions}
                allTags={allTags}
                integration={integration}
                setIntegration={setIntegration}
                setTags={setTags}
                tags={tags}
                search={search}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            </Route>
            <Route exact path='/integration/:integration/tags/:tags/search/:search'component={(props:any) => {
              console.log(props.match.params)
              const params = props.match.params
              return (
                <QuestionsDisplay
                  center
                  integration={params.integration}
                  tags={JSON.parse(params.tags)}
                  search={params.search}
                  managedQuestions={fetchedQuestions}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                />
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
