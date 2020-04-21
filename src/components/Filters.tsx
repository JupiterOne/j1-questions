import React from 'react'
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
  Avatar,
  Box,
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'
import DoneIcon from '@material-ui/icons/Done';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import IntegrationIcon from '@material-ui/icons/BuildOutlined';
import FilterListIcon from '@material-ui/icons/FilterListRounded';

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  integration: string;
  allTags: string[];
  tagCheckClicked: Function;
  tags: string[];
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()

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
    </Paper>
  )
}

export default React.memo(Filters);
