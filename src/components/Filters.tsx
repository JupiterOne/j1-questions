import React from 'react'
import {
  Paper
} from '@material-ui/core'
import {useFilterStyles} from '../classes'

const Filters = () => {
  const classes = useFilterStyles()

  return (
    <Paper className={classes.root}>
      Filters
    </Paper>
  )
}

export default Filters;
