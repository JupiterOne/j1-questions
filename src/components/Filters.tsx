import React from 'react'
import {
  Paper,
  Checkbox,
  Typography,
  FormControlLabel
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'

interface Props {
  managedQuestions: ManagedQuestionJSON
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()

  return (
    <Paper className={classes.root}>
      <Typography variant='h6'>Integrations</Typography>
      {Object.keys(props.managedQuestions.integrations).map((integration: any) => (
        <div>
          <FormControlLabel control={<Checkbox />} label={integration}/>
        </div>
      ))}
    </Paper>
  )
}

export default Filters;
