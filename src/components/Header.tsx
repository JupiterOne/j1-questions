import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
// import Button from '@material-ui/core/Button'
// import InputAdornment from '@material-ui/core/InputAdornment';
import {useHeaderStyles} from '../classes'
import {Link, useLocation} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  setSearch?: Function;
  disabled?: boolean | undefined;
}

const Header = (props : Props) => {
  const classes = useHeaderStyles()
  const location = useLocation()
  const [search, setSearch] = useState()

  return (
    <div>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Link to='/'>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            JupiterOne Questions
          </Typography>
          <div>
          {!props.disabled ?
            <form onSubmit={(e : any) => {
              e.preventDefault()
              if (props.setSearch !== undefined && search !== '') props.setSearch(search)
            }}>
              <IconButton><SearchIcon color='primary'/></IconButton>
              <Input
                className={classes.input}
                placeholder={'Search'}
                disabled={location.pathname.includes('/question/')}
                onChange={(e : any) => setSearch(e.target.value)}
              />
            </form>: <span/>}
          </div>
        </Toolbar>
        <div className='border'/>
      </AppBar>
    </div>
  )
}

export default Header
