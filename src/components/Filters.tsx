import React from 'react'
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
  Chip,
  Typography,
  FormControlLabel,
  RadioGroup,
  Box,
  Button,
  Avatar,
  Divider
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'
// import {Link} from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done';
// import CloseIcon from '@material-ui/icons/Close';
import copy from 'clipboard-copy'

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  integration: string;
  allTags: string[];
  tagCheckClicked: Function;
  tags: string[];
  search: string;
  clear: Function;
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()

  return (
    <Paper className={classes.root}>
      <Paper className={classes.title}>
        <Box p={3}>
          <Typography variant='h6'>Filters</Typography>
        </Box>
      </Paper>
      {(props.integration !== 'none' || props.tags.length !== 0 || props.search !== '') ? (
        <Paper style={{width: '100%', borderRadius: '0'}}>
          <Divider/>
          <Box m={3}>
            Search text: {(props.search === '') ? 'none' : props.search} <br/>
            Tags: {(props.tags.length > 0) ? props.tags.join(', ') : 'none'} <br/>
            Integration: {props.integration} <br/>
          </Box>
          <Divider/>
          <Button onClick={() => {
            props.clear()
          }} style={{width: '100%', borderRadius: '0'}} color='primary'>
            Clear Filters
          </Button>
        </Paper>
      ) : <span/>}
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant='subtitle1'>Integrations</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.notFlex}>
          {[...Object.keys(props.managedQuestions.integrations), 'none'].map((integration: any, index: number) => (
            <RadioGroup key={index} className={classes.notFlex} value={props.integration} onChange={() => props.integrationClicked(integration)}>
              <FormControlLabel value={integration} control={<Radio color='primary'/>} label={integration}/>
            </RadioGroup>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant='subtitle1'>Tags</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.flexWrap}>
          {props.allTags
            .sort()
            .map((tag: string, index : number) => (
              <Chip
                color='primary'
                variant='outlined'
                avatar={props.tags.includes(tag) ? <Avatar><DoneIcon /></Avatar> : undefined}
                className={classes.tag}
                key={index}
                onClick={() => props.tagCheckClicked(tag)}
                label={tag}
              />
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Button
        onClick={() => {
          copy(
            'http://localhost:3000/filter?'
              + ((props.tags.length !== 0) ? `&tags=${props.tags.join(',')}` : "")
              + ((props.integration !== 'none') ? `&integration=${props.integration}` : "")
              + ((props.search !== '') ? `&search=${props.search}` : "")
          )
        }}
        variant='contained'
        color='primary'
        className={classes.button}
      >
        Share URL
      </Button>
    </Paper>
  )
}

export default Filters;
