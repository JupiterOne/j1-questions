import React, {useState} from 'react'
import {
  Paper,
  Icon,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
  Chip,
  Typography,
  FormControlLabel,
  RadioGroup,
  Button,
  Avatar,
  Box,
  Snackbar
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'
// import {Link} from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import IntegrationIcon from '@material-ui/icons/BuildOutlined';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
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
  const [copied, setCopied] = useState(false)

  return (
    <Paper className={classes.root}>
      <ExpansionPanelSummary>
        <Icon>
          <FilterListIcon/>
        </Icon>
        <Typography variant='h6'>Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelSummary>
        <Icon>
          <IntegrationIcon/>
        </Icon>
        <Typography variant='subtitle1'>Integrations</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.notFlex}>
        {[...Object.keys(props.managedQuestions.integrations), 'none'].map((integration: any, index: number) => (
          <RadioGroup color='secondary' key={index} className={classes.notFlex} value={props.integration} onChange={() => props.integrationClicked(integration)}>
            <FormControlLabel value={integration} control={<Radio/>} label={integration}/>
          </RadioGroup>
        ))}
      </ExpansionPanelDetails>

      <ExpansionPanelSummary>
        <Icon>
          <TagIcon/>
        </Icon>
        <Typography variant='subtitle1'>Tags</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.flexWrap}>
        <Box mb={2}>
          <Box>
            {props.tags
            .filter((tag: string) => (
                props.tags.includes(tag)
            )).length !== 0 ? <Typography variant='subtitle1'>Active Tags</Typography> : <span/>}
          </Box>
          <Box mt={1}>
            {props.allTags
              .sort()
              .filter((tag: string) => (
                  props.tags.includes(tag)
              ))
              .map((tag: string, index : number) => (
                <Chip
                  color='secondary'
                  variant='outlined'
                  avatar={props.tags.includes(tag) ? <Avatar><DoneIcon /></Avatar> : undefined}
                  className={classes.tag}
                  key={index}
                  onClick={() => props.tagCheckClicked(tag)}
                  label={tag}
                />
            ))}
          </Box>
        </Box>
        <Box>
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
        </Box>
      </ExpansionPanelDetails>
      <Button
        onClick={() => {
          copy(
            'http://localhost:3000/filter?'
              + ((props.tags.length !== 0) ? `&tags=${props.tags.join(',')}` : "")
              + ((props.integration !== 'none') ? `&integration=${props.integration}` : "")
              + ((props.search !== '') ? `&search=${props.search}` : "")
          )
          setCopied(true)
        }}
        variant='contained'
        color='primary'
      >
        <OpenInNewIcon className={classes.icon}/> Share URL
      </Button>
      <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)}>
        <Alert severity="success">
          URL copied to clipboard.
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default Filters;
