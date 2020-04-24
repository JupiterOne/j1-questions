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
  ButtonGroup,
  Hidden,
  Checkbox,
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'
import DoneIcon from '@material-ui/icons/Done';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import IntegrationIcon from '@material-ui/icons/BuildOutlined';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import { useWindowSize } from "@reach/window-size";

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  integration: string;
  allTags: string[];
  tagCheckClicked: Function;
  tags: string[];
  filterLogic: string;
  setFilterLogic: Function;
  allCategories: string[];
  categories: string[];
  setCategories: Function;
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()
  const windowSize = useWindowSize()
  console.log(props.categories)

  return (
    <Hidden>
      <Paper elevation={0} className={windowSize.width > 750 ? classes.root : classes.smallRoot}>
        <Box m={2} className={classes.section}>
          <Icon>
            <FilterListIcon/>
          </Icon>
          <Typography variant='h6'>Filters</Typography>
        </Box>
        <Box m={2} className={classes.section}>
          <Icon>
            <IntegrationIcon/>
          </Icon>
          <Typography variant='subtitle1'>Integrations</Typography>
        </Box>
        <Box m={2} className={`${classes.section} ${classes.notFlex}`}>
          {[...Object.keys(props.managedQuestions.integrations), 'none'].map((integration: any, index: number) => (
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
        <Box m={2}>
          <ButtonGroup>
            <Button color={(props.filterLogic === 'and') ? 'primary' : 'default'} onClick={() => props.setFilterLogic('and')}>Filter by all</Button>
            <Button color={(props.filterLogic === 'or') ? 'primary' : 'default'} onClick={() => props.setFilterLogic('or')}>Filter by any</Button>
          </ButtonGroup>
          <div>
            {props.tags.length === 0 && props.filterLogic === 'or' && props.managedQuestions.questions.length !== 0 ? (
              <Box mt={2} style={{color: 'red'}}>You will need to select one tag for results to show.</Box>
            ) : null}
          </div>
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
        <Box m={2} className={`${classes.section} ${classes.flexWrap}`}>
          <Icon>
            <CategoryIcon/>
          </Icon>
          <Typography variant='subtitle1'>Category</Typography>
          <Box mt={4}>
            {props.allCategories.map(category =>
              <div key={category}>
                <Box ml={-11}>
                  <Checkbox
                    edge='start'
                    name={category}
                    checked={props.categories.includes(category)}
                    onChange={() => props.setCategories({category})}
                  />
                  {category}
                </Box>
              </div>
            )}
          </Box>
        </Box>
      </Paper>
    </Hidden>
  )
}

export default React.memo(Filters);
