import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LifeomicIcon from './lifeomic-icon.png';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl'
import {useHeaderStyles} from '../classes'
import {Link, useLocation} from 'react-router-dom'
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

interface Props {
  setSearch?: Function;
  search: string;
  disabled?: boolean | undefined;
  color: 'light' | 'dark';
  setTheme: Function;
}

const Header = (props : Props) => {
  const classes = useHeaderStyles()
  const location = useLocation()

  const debounce = (time:number, callBack: Function) => {
    const intervalId = setInterval(() => {
      callBack()
      clearInterval(intervalId)
    }, time)
  }


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
          <FormControl>
            <IconButton color='default' onClick={() => props.setTheme((theme:boolean) => !theme)}>{!(props.color === 'light') ? <Brightness7Icon/> : <Brightness4Icon/>}</IconButton>
          </FormControl>
          <div>
          {!props.disabled ?
            <div>
              <Input
                className={classes.input}
                placeholder={'Search'}
                value={props.search}
                disabled={location.pathname.includes('/question/')}
                onChange={(e : any) => {
                  const value = e.target.value
                  debounce(600, () => props.setSearch !== undefined ? props.setSearch(value) : null)
                }}
              />
            </div>: <span/>}
          </div>
        </Toolbar>
        <div className='border'/>
      </AppBar>
    </div>
  )
}

export default Header
