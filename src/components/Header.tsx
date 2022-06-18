import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

// temp
import ChevronLeftIcon from "react-feather/dist/icons/chevron-left";

import JupiterOneLogo from "./Logomark1.png";
import JupiterOneLogoDark from "./Logomark1.png";
import MenuMobile from "./MenuMobile.png";
import LogoMobile from "./logo-mobile.png";

import { useHeaderStyles } from "../classes";
import Context from "../AppContext";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const {
    setSearch,
    search,
    themeDark,
    managedQuestions
  } = useContext(Context);

  const classes = useHeaderStyles();
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  const [isActive, setActive] = useState(false);
  const [searchText, setSearchText] = useState(search);
  const toggleActiveClass = () => {
    setActive(!isActive);
  };
  const removeActiveClass = () => {
    setActive(false);
  };

  const handleClickGraphViewer = () =>
    history.push('/integration-graph');

  return (
    <div>
      <AppBar
        className={classes.root}
        position="static"
        elevation={0}
        color="inherit"
      >
        <Toolbar disableGutters={true}>

          <div className="ask-j1-header" style={{ width: "100%" }}>
            <div className={"ask-j1-header-container" + (isActive ? ' menu-active' : '')}>
              <div className="ask-j1-header-logo">
                <a className="atmc-header_logo" href="https://askj1.com" style={{ textDecoration: 'none' }}>
                  <img alt="j1Logo" src={themeDark ? JupiterOneLogoDark : JupiterOneLogo} style={{ height: 'auto', maxWidth: '100%' }} />
                </a>
              </div>
              <div className="ask-j1-header-logo-mobile">
                <img alt="j1Logo" src={LogoMobile} />
              </div>
              <div className={"ask-j1-menu-container" + (isActive ? ' menu-active' : '')} >
                <div className="ask-j1-header_navigation">
                  <HeaderMenu />
                </div>
                <div className="submenu" style={{ background: '#ECEFF1' }}>
                  <div className="submenu-items">
                    {!history.location.pathname.includes("/question") && (
                      <>
                        <div className="input-holder">
                          <InputBase
                            type="search"
                            className={clsx(classes.input, themeDark ? classes.inputDark : undefined)}
                            placeholder={"Search"}
                            value={searchText}
                            onChange={(e: any) => {
                              setSearchText(e.target.value);
                              setSearch(e.target.value);
                            }}
                          />
                          {!searchText && <img className="search-icon" alt="search-icon" src="https://try.jupiterone.com/hubfs/Vector.svg" />}
                        </div>

                        <Button
                          color="primary"
                          className={classes.actionButton}
                          size="small"
                          variant="outlined"
                          onClick={handleClickGraphViewer}
                        >
                          <ChevronLeftIcon /> Graph Viewer
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="close-button" onClick={removeActiveClass}>X</div>
              </div>
              <div className={"mobile-toggler" + (isActive ? ' menu-active' : '')}
                onClick={toggleActiveClass} >
                <img alt="toggler" src={MenuMobile} />
              </div>
            </div>
          </div>


        </Toolbar>
        {
          managedQuestions.questions.length === 1 && <LinearProgress />
        }
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
