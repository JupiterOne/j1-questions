import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import QuestionDisplay from './components/QuestionDisplay'
import Main from './Main'
import fetchQuestions from './methods/fetchQuestions'
import uniqueArray from './methods/uniqueArray'
import {ManagedQuestionJSON, Question} from './types'
import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from './components/Header'

import {ThemeProvider} from '@material-ui/core/styles'
import {
  CssBaseline,
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
  const [managedQuestions, setManagedQuestions] = useState<ManagedQuestionJSON>(intialState)
  const [allTags, setAllTags] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [themeDark, setTheme] = useState(false)

  console.log(search)

  useEffect(() => {
    fetchQuestions().then((r : ManagedQuestionJSON) => {
      const tags : string[] = r.questions.map((question : Question) => {
        return question.tags
      }).flat(2)
      setAllTags([])
      setAllTags(uniqueArray(tags))

      setManagedQuestions(r)
    })
  }, [])

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline/>
        <Header color={themeDark ? 'dark' : 'light'} setTheme={setTheme} search={search} setSearch={setSearch}/>

        <Container maxWidth="lg">
          <Switch>

            <Route exact path='/'>
              <Main
                search={search}
                setSearch={setSearch}
                managedQuestions={managedQuestions}
                allTags={allTags}
              />
            </Route>
            <Route exact path='/filter'>
              <Main
                search={search}
                setSearch={setSearch}
                managedQuestions={managedQuestions}
                allTags={allTags}
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

// <Route exact path='/filter' render={(props:any) => {
//   console.log(queryString.parse(props.location.search))
//   const params = queryString.parse(props.location.search)
//   if (typeof params.integration !== 'string') {
//     params.integration = ''
//   }
//   if (typeof params.search !== 'string') {
//     params.search = ''
//   }
//   if (typeof params.tags !== 'string') {
//     params.tags = '[]'
//   }
//   return (
//     <QuestionsDisplay
//       center
//       integration={params.integration}
//       tags={params.tags.split(',')}
//       search={params.search}
//       managedQuestions={managedQuestions}
//       questionNumber={questionNumber}
//       setQuestionNumber={setQuestionNumber}
//     />
//   )
// }}/>
