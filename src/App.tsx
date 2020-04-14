import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route>404 Not Found</Route>
      </Switch>
    </Router>
  );
}

export default App;
