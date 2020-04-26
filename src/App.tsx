import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import QuestionDisplay from './components/QuestionDisplay'
import Main from './Main'
import fetchQuestions from './methods/fetchQuestions'
import uniqueArray from './methods/uniqueArray'
import {ManagedQuestionJSON, Question} from './types'
import { createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header'

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

function App() {
  const [managedQuestions, setManagedQuestions] = useState<ManagedQuestionJSON>(intialState)
  const [allTags, setAllTags] = useState<string[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [themeDark, setTheme] = useState<boolean>(false)

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

  const theme = createMuiTheme({
    palette: {
      type: themeDark ? 'dark' : 'light',
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline/>
        <Header
          color={themeDark ? 'dark' : 'light'}
          setTheme={setTheme}
          setSearch={setSearch}
          managedQuestions={managedQuestions}
        />

        <Container maxWidth="lg">
          <Switch>

            <Route exact path='/'>
              <Main
                search={search}
                managedQuestions={managedQuestions}
                allTags={allTags}
                allCategories={allCategories}
              />
            </Route>
            <Route exact path='/filter'>
              <Main
                search={search}
                managedQuestions={managedQuestions}
                allTags={allTags}
                allCategories={allCategories}
              />
            </Route>

            <Route exact path='/question/:questionTitle'>
              <QuestionDisplay managedQuestions={managedQuestions}/>
            </Route>

          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
