import React from 'react'
import {
  Paper,
  Radio,
  Typography,
  FormControlLabel,
  RadioGroup
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  integration: string;
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()

  return (
    <Paper className={classes.root}>
      <Typography variant='h6'>Integrations</Typography>
      {[...Object.keys(props.managedQuestions.integrations), 'none'].map((integration: any) => (
        <RadioGroup value={props.integration} onChange={() => props.integrationClicked(integration)}>
          <FormControlLabel value={integration} control={<Radio/>} label={integration}/>
        </RadioGroup>
      ))}
    </Paper>
  )
}

export default Filters;
