import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import QuestionDisplay from './components/QuestionDisplay'
import Main from './Main'
import fetchQuestions from './methods/fetchQuestions'
import uniqueArray from './methods/uniqueArray'
import {ManagedQuestionJSON, Question} from './types'
import { createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header'
import throttle from 'lodash/throttle'
import Context from './AppContext'
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

function App() {

  const params : any = queryString.parse(window.location.search)

  const [managedQuestions, setManagedQuestions] = useState<ManagedQuestionJSON>(intialState)
  const [allTags, setAllTags] = useState<string[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [search, setRawSearch] = useState('')
  const [themeDark, setTheme] = useState<boolean>(false)
  const [integrations, setIntegrations] = useState<string[]>((params.integrations) ? params.integrations.split(',') : [])
  const [tags, setTags] = useState<string[]>((params.tags) ? params.tags.split(',') : [])
  const [tagFilter, setFilterLogic] = useState<string>(params.tagFilter ? params.tagFilter : 'all')
  const [categories, setCategories] = useState<string[]>([])

  const setSearch = throttle(setRawSearch, 700)

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
    },
    overrides: {
      MuiPaper: {
        root: {
          boxShadow: 'none'
        }
      },
    }
  });

  return (
    <Context.Provider value={{
      managedQuestions,
      allTags,
      themeDark, setTheme,
      allCategories,
      search, setSearch,
      integrations, setIntegrations,
      tags, setTags,
      tagFilter, setFilterLogic,
      categories, setCategories
    }}>
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Header/>

          <Container maxWidth="lg">
            <Switch>

              <Route exact path='/'>
                <Main/>
              </Route>
              <Route exact path='/filter'>
                <Main/>
              </Route>

              <Route exact path='/question/:questionTitle'>
                <QuestionDisplay/>
              </Route>

            </Switch>
          </Container>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
