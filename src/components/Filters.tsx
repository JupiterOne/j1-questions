import React from 'react'
import {
  Paper,
  Icon,
  Box,
  Radio,
  Chip,
  Typography,
  FormControlLabel,
  RadioGroup,
  Avatar,
  Button,
  ButtonGroup
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
  filterLogic: string;
  setFilterLogic: Function;
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Box m={2} className={classes.section}>
        <Icon>
          <FilterListIcon/>
        </Icon>
        <Typography variant='h6'>Filters</Typography>
      </Box>
      <Box m={2}>
        <ButtonGroup>
          <Button color={(props.filterLogic === 'and') ? 'primary' : 'default'} onClick={() => props.setFilterLogic('and')}>Filter by all</Button>
          <Button color={(props.filterLogic === 'or') ? 'primary' : 'default'} onClick={() => props.setFilterLogic('or')}>Filter by any</Button>
        </ButtonGroup>
      </Box>
      <Box m={2} className={classes.section}>
        <Icon>
          <IntegrationIcon/>
        </Icon>
        <Typography variant='subtitle1'>Integrations</Typography>
      </Box>
      <Box m={2} className={`${classes.section} ${classes.notFlex}`}>
        {[...Object.keys(props.managedQuestions.integrations), 'none', 'any'].map((integration: any, index: number) => (
          <RadioGroup color='secondary' key={index} className={classes.notFlex} value={props.integration} onChange={() => props.integrationClicked(integration)}>
            <FormControlLabel value={integration} control={<Radio/>} label={integration}/>
          </RadioGroup>
        ))}
      </Box>

      <Box m={2} className={classes.section}>
        <Icon>
          <TagIcon/>
        </Icon>
        <Typography variant='subtitle1'>Tags</Typography>
      </Box>
      <Box m={2} className={`${classes.section} ${classes.flexWrap}`}>
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
      </Box>
    </Paper>
  )
}

export default React.memo(Filters);
