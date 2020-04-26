import React, {useContext} from 'react'
import {
  Paper,
  Icon,
  Box,
  Chip,
  Typography,
  Avatar,
  Button,
  ButtonGroup,
  Hidden,
  Checkbox,
  Zoom
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import DoneIcon from '@material-ui/icons/Done';
import TagIcon from '@material-ui/icons/LocalOfferOutlined';
import IntegrationIcon from '@material-ui/icons/BuildOutlined';
import FilterListIcon from '@material-ui/icons/FilterListRounded';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import { useWindowSize } from "@reach/window-size";
import Context from '../AppContext'

interface Props {
  // managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  // integrations: string[];
  // allTags: string[];
  tagCheckClicked: Function;
  // tags: string[];
  // filter: string;
  // setFilterLogic: Function;
  // allCategories: string[];
  // categories: string[];
  setCategories: Function;
}

const Filters = (props: Props) => {
  console.log('Filter')
  const {allCategories, categories, managedQuestions, integrations, tagFilter, allTags, tags, setFilterLogic} = useContext(Context)

  const classes = useFilterStyles()
  const windowSize = useWindowSize()

  return (
    <Hidden>
      <Paper elevation={0} className={windowSize.width > 750 ? classes.root : classes.smallRoot}>
        <Box m={2} className={classes.section}>
          <Icon>
            <FilterListIcon/>
          </Icon>
          <Typography variant='h6'>Filters</Typography>
        </Box>
        <Box m={2} className={`${classes.section} ${classes.flexWrap}`}>
          <Icon>
            <CategoryIcon/>
          </Icon>
          <Typography variant='subtitle1'>Category</Typography>
        </Box>
        <Box m={2}>
          {allCategories.map((category: any) =>
            <div onClick={() => props.setCategories({category})} key={category}>
              <Box>
                <Checkbox
                  edge='start'
                  name={category}
                  checked={categories.includes(category)}
                  onChange={() => props.setCategories({category})}
                />
                {category}
              </Box>
            </div>
          )}
        </Box>
        <Box m={2} className={classes.section}>
          <Icon>
            <IntegrationIcon/>
          </Icon>
          <Typography variant='subtitle1'>Integrations</Typography>
        </Box>
        <Box m={0.7}>
          {[...Object.keys(managedQuestions.integrations), 'none'].map((integration: string, index: number) => (
            <div key={index}>
              <Checkbox
                checked={integrations.includes(integration)}
                onChange={() => props.integrationClicked(integration)}
              />
              {integration /* {Object.keys(managedQuestions.integrations).length > 0 && integration !== 'none' ? managedQuestions.integrations[integration].title : 'none'} */}
            </div>
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
            <Button color={(tagFilter === 'all') ? 'primary' : 'default'} onClick={() => setFilterLogic('all')}>Filter by all</Button>
            <Button color={(tagFilter === 'any') ? 'primary' : 'default'} onClick={() => setFilterLogic('any')}>Filter by any</Button>
          </ButtonGroup>
        </Box>
        <Box m={2} className={`${classes.section} ${classes.flexWrap}`}>
          <Box>
            {allTags
              .sort()
              .map((tag: string, index : number) => (
                <Chip
                  color='primary'
                  variant='outlined'
                  avatar={tags.includes(tag) ? <Zoom in={tags.includes(tag)}><Avatar><DoneIcon /></Avatar></Zoom> : undefined}
                  className={classes.tag}
                  key={index}
                  onClick={() => props.tagCheckClicked(tag)}
                  label={tag}
                />
            ))}
          </Box>
        </Box>
      </Paper>
    </Hidden>
  )
}

export default React.memo(Filters);
