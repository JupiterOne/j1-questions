import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import QuestionDisplay from './components/QuestionDisplay'
import Main from './Main'
import fetchQuestions from './methods/fetchQuestions'
import uniqueArray from './methods/uniqueArray'
import {ManagedQuestionJSON, Question} from './types'
import { createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header'
import queryString from 'query-string'

import {ThemeProvider} from '@material-ui/core/styles'
import {
  CssBaseline,
  Container
} from '@material-ui/core'

const intialState = {
  integrations: {
  },
  questions: []
}

const themeCreator = (isDark: boolean) => createMuiTheme({
  palette: {
    type: isDark ? 'dark' : 'light',
    primary: {
      main: 'rgb(22, 150, 172)',
      contrastText: '#FFF'
    },
    secondary: {
      main: 'rgba(2, 130, 152)',
    },
  },
  typography: {
    allVariants : {
      fontFamily: "Roboto"
    }
  }
});

function App() {
  const [managedQuestions, setManagedQuestions] = useState<ManagedQuestionJSON>(intialState)
  const [allTags, setAllTags] = useState<string[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [themeDark, setTheme] = useState<boolean>(false)

  const params = queryString.parse(window.location.search)
  const [search, setSearch] = useState((params.search as string) || '')

  useEffect(() => {
    fetchQuestions().then((r : ManagedQuestionJSON) => {
      const tags : string[] = r.questions.flatMap((question : Question) => {
        return question.tags
      })
      const categories : any[] = r.questions.flatMap((question : Question) => {
        if (question.category !== undefined) {
          return question.category
        }
      })
      setAllCategories([])
      setAllCategories(uniqueArray(categories))
      setAllTags([])
      setAllTags(uniqueArray(tags))

      setManagedQuestions(r)
    })
  }, [])

  const theme = themeCreator(themeDark);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline/>
        <Switch>

          <Route exact path='/'>
            <Redirect to='/filter' />
          </Route>


          <Route exact path='/filter'>
            <Header
              color={themeDark ? 'dark' : 'light'}
              setTheme={setTheme}
              setSearch={setSearch}
              managedQuestions={managedQuestions}
            />

            <Container maxWidth="lg">
              <Main
                search={search}
                managedQuestions={managedQuestions}
                allTags={allTags}
                allCategories={allCategories}
              />
            </Container>
          </Route>


          <Route exact path='/question/:questionTitle'>
            <Header
              color={themeDark ? 'dark' : 'light'}
              setTheme={setTheme}
              managedQuestions={managedQuestions}
            />

            <Container maxWidth="lg">
              <QuestionDisplay managedQuestions={managedQuestions}/>
            </Container>
          </Route>

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
