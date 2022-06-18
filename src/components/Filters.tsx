import React, { useContext } from "react";
import {
  Paper,
  Icon,
  Box,
  Typography,
  Hidden,
  Checkbox,
  FormControlLabel,
  Divider
} from "@material-ui/core";
import { useFilterStyles } from "../classes";
import IntegrationIcon from "react-feather/dist/icons/zap";
import CategoryIcon from "react-feather/dist/icons/grid";
import { useWindowSize } from "@reach/window-size";
import Context from "../AppContext";

const Filters = () => {
  const classes = useFilterStyles();
  const windowSize = useWindowSize();

  return (
    <Hidden>
      <Paper
        elevation={0}
        className={windowSize.width > 750 ? classes.root : classes.smallRoot}
      >
        <QuestionCategoryFilters/>
        <Divider className={classes.divider} />
        <IntegrationFilters/>
      </Paper>
    </Hidden>
  );
};

export const QuestionCategoryFilters = () => {
  const {
    allCategories,
    categories,
    setCategory
  } = useContext(Context);

  const classes = useFilterStyles();

  return (
    <>
        <Box m={1} className={classes.section}>
          <Icon classes={{ root: classes.icon}}>
            <CategoryIcon />
          </Icon>
          <Typography variant="h6" className={classes.subtitle}>Category</Typography>
        </Box>
        <Box className={classes.checklist} m={2}>
          {allCategories.map((category: any) => (
            <FormControlLabel
              classes={{
                label: classes.checkboxLabel
              }}
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
    </>
  );
};

export const IntegrationFilters = () => {
  const {
    managedQuestions,
    integrations,
    setIntegration
  } = useContext(Context);

  const classes = useFilterStyles();

  return (
    <>
      <Box m={1} className={classes.section}>
        <Icon classes={{ root: classes.icon}}>
          <IntegrationIcon />
        </Icon>
        <Typography variant="h6" className={classes.subtitle}>Integrations</Typography>
      </Box>
      <Box className={classes.checklist} m={2}>
        {[...Object.keys(managedQuestions.integrations), "none"].map(
          (integration: string, index: number) => (
            <FormControlLabel
            classes={{
              label: classes.checkboxLabel
            }}
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
    </>
  );
}

export default React.memo(Filters);
