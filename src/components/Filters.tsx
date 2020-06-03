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
  FormControlLabel,
  Divider
} from "@material-ui/core";
import { useFilterStyles } from "../classes";
import DoneIcon from "@material-ui/icons/Done";
import TagIcon from "react-feather/dist/icons/tag";
import IntegrationIcon from "react-feather/dist/icons/zap";
import CategoryIcon from "react-feather/dist/icons/grid";
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
        <Box m={1} className={classes.section}>
          <Icon classes={{ root: classes.icon}}>
            <CategoryIcon />
          </Icon>
          <Typography variant="h6" className={classes.subtitle}>Category</Typography>
        </Box>
        <Box m={2}>
          {allCategories.map((category: any) => (
            <FormControlLabel
              className={classes.checkboxItem}
              classes={{ label: classes.checkboxLabel}}
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
        <Divider className={classes.divider} />
        <Box m={1} className={classes.section}>
          <Icon classes={{ root: classes.icon}}>
            <IntegrationIcon />
          </Icon>
          <Typography variant="h6" className={classes.subtitle}>Integrations</Typography>
        </Box>
        <Box m={2}>
          {[...Object.keys(managedQuestions.integrations), "none"].map(
            (integration: string, index: number) => (
              <FormControlLabel
              className={classes.checkboxItem}
              classes={{ label: classes.checkboxLabel}}
              key={index}
              control={
                <Checkbox
                checked={integrations.includes(integration)}
                onChange={() => setIntegration(integration)}
                />
              }
              label={
                <>
                      {Object.keys(managedQuestions.integrations).length > 0 &&
                      integration !== "none"
                      ? managedQuestions.integrations[integration].title
                      : "None"}
                    </>
                  }
                  />
                  )
                  )}
        </Box>
        <Divider className={classes.divider} />
        <Box m={1} className={classes.section}>
          <Icon classes={{ root: classes.icon}}>
            <TagIcon />
          </Icon>
          <Typography variant="h6" className={classes.subtitle}>Tags</Typography>
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
        <Box m={2} className={classes.section}>
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
