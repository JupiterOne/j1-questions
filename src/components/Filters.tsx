import React, { useContext } from "react";
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
  Zoom,
  FormControlLabel
} from "@material-ui/core";
import { useFilterStyles } from "../classes";
import DoneIcon from "@material-ui/icons/Done";
import TagIcon from "@material-ui/icons/LocalOfferOutlined";
import IntegrationIcon from "@material-ui/icons/BuildOutlined";
import FilterListIcon from "@material-ui/icons/FilterListRounded";
import CategoryIcon from "@material-ui/icons/CategoryOutlined";
import { useWindowSize } from "@reach/window-size";
import Context from "../AppContext";

const Filters = () => {
  const {
    allCategories,
    categories,
    managedQuestions,
    integrations,
    tagFilter,
    allTags,
    tags,
    setFilterLogic,
    setCategory,
    setTag,
    setIntegration
  } = useContext(Context);

  const classes = useFilterStyles();
  const windowSize = useWindowSize();

  return (
    <Hidden>
      <Paper
        elevation={0}
        className={windowSize.width > 750 ? classes.root : classes.smallRoot}
      >
        <Box m={2} className={classes.section}>
          <Icon>
            <FilterListIcon />
          </Icon>
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Box m={2} className={`${classes.section} ${classes.flexWrap}`}>
          <Icon>
            <CategoryIcon />
          </Icon>
          <Typography variant="subtitle1">Category</Typography>
        </Box>
        <Box m={2}>
          {allCategories.map((category: any) => (
            <FormControlLabel
              style={{ display: "block", width: "100%" }}
              onChange={() => setCategory(category)}
              key={category}
              control={
                <Checkbox
                  name={category}
                  checked={categories.includes(category)}
                />
              }
              label={category}
            />
          ))}
        </Box>
        <Box m={2} className={classes.section}>
          <Icon>
            <IntegrationIcon />
          </Icon>
          <Typography variant="subtitle1">Integrations</Typography>
        </Box>
        <Box m={0.7}>
          {[...Object.keys(managedQuestions.integrations), "none"].map(
            (integration: string, index: number) => (
              <div key={index}>
                <Checkbox
                  checked={integrations.includes(integration)}
                  onChange={() => setIntegration(integration)}
                />
                {Object.keys(managedQuestions.integrations).length > 0 &&
                integration !== "none"
                  ? managedQuestions.integrations[integration].title
                  : "none"}
              </div>
            )
          )}
        </Box>
        <Box m={2} className={classes.section}>
          <Icon>
            <TagIcon />
          </Icon>
          <Typography variant="subtitle1">Tags</Typography>
        </Box>
        <Box m={2}>
          <ButtonGroup>
            <Button
              color={tagFilter === "all" ? "primary" : "default"}
              onClick={() => setFilterLogic("all")}
            >
              Filter by all
            </Button>
            <Button
              color={tagFilter === "any" ? "primary" : "default"}
              onClick={() => setFilterLogic("any")}
            >
              Filter by any
            </Button>
          </ButtonGroup>
        </Box>
        <Box m={2} className={`${classes.section} ${classes.flexWrap}`}>
          <Box>
            {allTags.sort().map((tag: string, index: number) => (
              <Chip
                color="primary"
                variant="outlined"
                avatar={
                  tags.includes(tag) ? (
                    <Zoom in={tags.includes(tag)}>
                      <Avatar>
                        <DoneIcon />
                      </Avatar>
                    </Zoom>
                  ) : (
                    undefined
                  )
                }
                className={classes.tag}
                key={index}
                onClick={() => setTag(tag)}
                label={tag}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Hidden>
  );
};

export default React.memo(Filters);
