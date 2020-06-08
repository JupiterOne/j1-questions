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
      background: {
        default: themeDark ? "#00062a" : "#eff0f5",
        paper: themeDark ? "#021a40" : "#fff",
      },
      primary: {
        main: themeDark ? "#26cbe5" : "#0096ad",
        contrastText: "#FFF"
      },
      secondary: {
        main: "rgba(2, 130, 152)"
      },
      text: {
        primary: themeDark ? "#FFFFFF" : "#353945",
        secondary: themeDark ? "#d4d6e3" : "#596173",
        hint: themeDark ? "#17305d" : "#8e97ab",
      }
    },
    typography: {
      allVariants: {
        fontFamily: "Lato"
      }
    },
    overrides: {
      MuiAppBar: {
        root: {
          background: themeDark ? "#021a40" : "#FFF",
        }
      },
      MuiCard: {
        root: {
          overflowY: "auto",
        }
      },
      MuiCheckbox: {
        root: {
          color: themeDark ? "#5a6887" : "#7a849c",
          padding: '2px 8px',
        },
        colorSecondary: {
          '&$checked': {
            '&:hover': {
              backgroundColor: 'transparent',
            }
          }
        }
      },
      MuiFormControlLabel: {
        root: {
          display: "flex",
          alignItems: "flex-start",
        }
      },
      MuiIconButton: {
        root: {
          color: themeDark ? "#b5bccb" : "#7a849c",
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        colorPrimary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        colorSecondary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiTouchRipple: {
        rippleVisible: {
          animation: 'none',
          display: 'none',
        },
        childLeaving: {
          animation: 'none',
          display: 'none',
        },
        childPulsate: {
          animation: 'none',
          display: 'none',
        },
      },
      MuiPaper: {
        root: {
          boxShadow: "none"
        }
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Container maxWidth="xl" style={{ padding: "16px" }}>
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
