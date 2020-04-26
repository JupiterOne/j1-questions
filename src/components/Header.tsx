import React, {useEffect, useState, useContext} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LifeomicIcon from './lifeomic-icon.png';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip'
import Alert from '@material-ui/lab/Alert'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksOutlined';
import {useHeaderStyles} from '../classes'
import {Link, useLocation} from 'react-router-dom'
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress'
import queryString from 'query-string'
import {useHistory} from 'react-router-dom'
import copy from 'clipboard-copy'
import { useWindowSize } from "@reach/window-size";
import Context from '../AppContext'

// interface Props {
//   setSearch: any;
//   disabled?: boolean | undefined;
//   color: 'light' | 'dark';
//   setTheme: Function;
//   managedQuestions: any;
// }

const Header = () => {
  console.log('Header')
  const {setSearch, themeDark, setTheme, managedQuestions} = useContext(Context)

  const classes = useHeaderStyles()
  const location = useLocation()
  const [searchText, setSearchText] = useState('')
  const [copied, setCopied] = useState(false)
  const history = useHistory()
  const windowSize = useWindowSize()

  const params = queryString.parse(history.location.search)

  useEffect(() => {
    console.log('Header useEffect')

    const rawSearchText = (params.search as string) || '';
    setSearchText(rawSearchText)
    setSearch(rawSearchText)
  }, [])

  return (
    <div>
      <AppBar className={classes.root} position="static" elevation={0}>
        <Toolbar>
          <Link to='/'>
            <img className={classes.menuButton} src={LifeomicIcon}/>
          </Link>
          <Typography variant="button" className={classes.title}>
            <Typography className={classes.bold} variant="h5" component='span'>Jupiter<span className={classes.thin}>One</span> </Typography> Questions
          </Typography>
          <div className={windowSize.width < 500 ? classes.headerPart : ''}>
            {!(location.pathname.includes('/question/')) ? (
              <TextField
                type="search"
                variant="outlined"
                className={classes.input}
                placeholder={'Search'}
                value={searchText}
                onChange={(e: any) => {
                  setSearchText(e.target.value)
                  setSearch(e.target.value)
                }}
              />
            ) : null}
          </div>
          <Hidden smDown>
            <div className={`${classes.headerPart} ${classes.alignRight}`}>
              <Tooltip title="Launch JupiterOne">
                <IconButton href='https://apps.us.jupiterone.io'>
                  <OpenInNewIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy URL">
                <IconButton onClick={() => {
                  copy(window.location.href)
                  setCopied(true)
                }}>
                  <LibraryBooksIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Change theme">
                <IconButton onClick={() => {
                  setTheme((theme:boolean) => !theme)
                }}>
                  {!(themeDark) ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </div>
          </Hidden>
        </Toolbar>
        {managedQuestions.questions.length === 1 ? <LinearProgress />: <div className='border'/>}
      </AppBar>
      <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)}>
        <Alert severity="success">
          URL copied to clipboard.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Header
