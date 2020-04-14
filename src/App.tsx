import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import theme from './theme'
import {ThemeProvider} from '@material-ui/core/styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header/>
        <Switch>
          <Route>404 Not Found</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
