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
  IconButton
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'
// import {Link} from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import IntegrationIcon from '@material-ui/icons/Apps';
import FilterListIcon from '@material-ui/icons/FilterList';
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
          <RadioGroup key={index} className={classes.notFlex} value={props.integration} onChange={() => props.integrationClicked(integration)}>
            <FormControlLabel value={integration} control={<Radio color='primary'/>} label={integration}/>
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
            <Typography variant='subtitle1'>Active Tags</Typography>
          </Box>
          <Box mt={1}>
            {props.allTags
              .sort()
              .filter((tag: string) => (
                props.tags.includes(tag)
              ))
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
      <br/><br/>
      {copied ? (
        <Alert variant="outlined" severity="success">
          URL copied to clipboard.
        </Alert>
      ) : null}
    </Paper>
  )
}

export default Filters;
