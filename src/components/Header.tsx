import React, {useEffect, useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LifeomicIcon from './lifeomic-icon.png';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
// import Icon from '@material-ui/core/Icon'
import Alert from '@material-ui/lab/Alert'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksOutlined';
import {useHeaderStyles} from '../classes'
import {Link, useLocation} from 'react-router-dom'
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import queryString from 'query-string'
import {useHistory} from 'react-router-dom'
import debounce from 'lodash/debounce';
import copy from 'clipboard-copy'

interface Props {
  setSearch: any;
  disabled?: boolean | undefined;
  color: 'light' | 'dark';
  setTheme: Function;
}

const Header = (props : Props) => {
  const classes = useHeaderStyles()
  const location = useLocation()
  const [searchText, setSearchText] = useState('')
  const [copied, setCopied] = useState(false)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const params = queryString.parse(history.location.search)
  const setSearch = debounce(props.setSearch, 700)


  useEffect(() => {
    console.log(params)
    if (typeof params.search !== 'string') {
      params.search = ''
    }
    setSearchText((params.search) ? params.search : '')
    setSearch(params.search)
  }, [])

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Link to='/'>
            <img className={classes.menuButton} src={LifeomicIcon}/>
          </Link>
          <Typography variant="h6" className={classes.title}>
            JupiterOne Questions
          </Typography>
          <IconButton onClick={() => {
            copy(`http://localhost:3000${history.location.pathname}`)
            setCopied(true)
            handleClose()
          }}>
            <LibraryBooksIcon/>
          </IconButton>
          <IconButton onClick={() => {
            props.setTheme((theme:boolean) => !theme)
            handleClose()
          }}>
            {!(props.color === 'light') ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <div>
          {!props.disabled ?
            <div>
              <Input
                className={classes.input}
                placeholder={'Search'}
                value={searchText}
                disabled={location.pathname.includes('/question/')}
                onChange={(e: any) => {
                  setSearchText(e.target.value)
                  setSearch(e.target.value)
                }}
              />
            </div>: <span/>}
          </div>
        </Toolbar>
        <div className='border'/>
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
// <Button
//   onClick={() => {
//     copy(
//       'http://localhost:3000/filter?'
//         + ((props.tags.length !== 0) ? `&tags=${props.tags.join(',')}` : "")
//         + ((props.integration !== 'none') ? `&integration=${props.integration}` : "")
//         + ((props.search !== '') ? `&search=${props.search}` : "")
//     )
//     setCopied(true)
//   }}
//   variant='contained'
//   color='primary'
// >
//   <OpenInNewIcon className={classes.icon}/> Share URL
// </Button>
// <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)}>
//   <Alert severity="success">
//     URL copied to clipboard.
//   </Alert>
// </Snackbar>
