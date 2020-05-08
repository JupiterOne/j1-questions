import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import QuestionDisplay from "./components/QuestionDisplay";
import Main from "./Main";
import { createMuiTheme } from "@material-ui/core/styles";
import Header from "./components/Header";
import Context from "./AppContext";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";

function App() {
  const { themeDark } = React.useContext(Context);

  const theme = createMuiTheme({
    palette: {
      type: themeDark ? "dark" : "light",
      primary: {
        main: "rgb(22, 150, 172)",
        contrastText: "#FFF"
      },
      secondary: {
        main: "rgba(2, 130, 152)"
      }
    },
    typography: {
      allVariants: {
        fontFamily: "Roboto"
      }
    },
    overrides: {
      MuiPaper: {
        root: {
          boxShadow: "none"
        }
      },
      MuiAppBar: {
        root: {
          background: themeDark ? "#424242" : "#FFF"
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/">
            <Redirect to="/filter" />
          </Route>

          <Route exact path="/filter">
            <Main />
          </Route>

          <Route exact path="/question/:questionTitle">
            <QuestionDisplay />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
