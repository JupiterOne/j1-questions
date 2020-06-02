import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import JupiterOneLogo from "./jupiterone-logo.svg";
import JupiterOneLogoDark from "./jupiterone-logo-reversed.svg";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import Alert from "@material-ui/lab/Alert";
import CopyIcon from "react-feather/dist/icons/copy";
import { useHeaderStyles } from "../classes";
import { Link, useHistory } from "react-router-dom";
import MoonIcon from "react-feather/dist/icons/moon";
import SunIcon from "react-feather/dist/icons/sun";
import LaunchIcon from "@lifeomic/react-brand-icons/jupiterone/class/CodeDeploy";
import Hidden from "@material-ui/core/Hidden";
import LinearProgress from "@material-ui/core/LinearProgress";
import copy from "clipboard-copy";
import { useWindowSize } from "@reach/window-size";
import Context from "../AppContext";

const Header = () => {
  const {
    setSearch,
    search,
    themeDark,
    setTheme,
    managedQuestions
  } = useContext(Context);

  const classes = useHeaderStyles();
  const [copied, setCopied] = useState(false);
  const windowSize = useWindowSize();
  const history = useHistory();

  const [searchText, setSearchText] = useState(search);

  return (
    <div>
      <AppBar
        className={classes.root}
        position="fixed"
        elevation={0}
        color="inherit"
      >
        <Toolbar>
          <Link className={classes.homeLink} to="/">
            <img className={classes.menuButton} src={themeDark ? JupiterOneLogoDark : JupiterOneLogo } />
          </Link>
          <Typography className={classes.title}>
            Questions Library
          </Typography>
          <div className={windowSize.width < 500 ? classes.headerPart : ""}>
            {!history.location.pathname.includes("/question") && (
              <TextField
                type="search"
                variant="outlined"
                className={classes.input}
                size="small"
                placeholder={"Search"}
                value={searchText}
                onChange={(e: any) => {
                  setSearchText(e.target.value);
                  setSearch(e.target.value);
                }}
              />
            )}
          </div>
          <Hidden smDown>
            <div className={`${classes.headerPart} ${classes.alignRight}`}>
              <Tooltip title="Launch JupiterOne">
                <IconButton href="https://apps.us.jupiterone.io">
                  <LaunchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy URL">
                <IconButton
                  onClick={() => {
                    copy(window.location.href);
                    setCopied(true);
                  }}
                >
                  <CopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Change theme">
                <IconButton
                  onClick={() => {
                    setTheme((theme: boolean) => !theme);
                  }}
                >
                  {!themeDark ? <SunIcon /> : <MoonIcon />}
                </IconButton>
              </Tooltip>
            </div>
          </Hidden>
        </Toolbar>
        {managedQuestions.questions.length === 1 ? (
          <LinearProgress />
        ) : (
          <div className="border" />
        )}
      </AppBar>
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
      >
        <Alert severity="success">URL copied to clipboard.</Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
