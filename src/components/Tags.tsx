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
  Zoom,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import { useFilterStyles } from "../classes";
import DoneIcon from "@material-ui/icons/Done";
import TagIcon from "react-feather/dist/icons/tag";
import { useWindowSize } from "@reach/window-size";
import Context from "../AppContext";

const Tags = () => {
  const {
    tagFilter,
    allTags,
    tags,
    setFilterLogic,
    setTag,
  } = useContext(Context);

  const classes = useFilterStyles();
  const windowSize = useWindowSize();

  return (
    <>
      <Paper
        elevation={0}
        className={clsx(classes.tagsPaper, windowSize.width > 750 ? classes.root : classes.smallRoot)}
      >
        <Box m={1} className={classes.section}>
          <Icon classes={{ root: classes.icon}}>
            <TagIcon />
          </Icon>
          <Typography variant="h6" className={classes.subtitle}>Tags</Typography>
          <ButtonGroup className={classes.buttonGroup}>
            <Tooltip title="Filter by All">
              <Button
                size="small"
                color={tagFilter === "all" ? "primary" : "default"}
                onClick={() => setFilterLogic("all")}
                >
                All
              </Button>
            </Tooltip>
            <Tooltip title="Filter by Any">
              <Button
                size="small"
                color={tagFilter === "any" ? "primary" : "default"}
                onClick={() => setFilterLogic("any")}
                >
                Any
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
        <Box m={2} className={clsx(classes.section, classes.tags)}>
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
    </>
  );
};

export default React.memo(Tags);
