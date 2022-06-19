import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 3.5,
      height: "100%",
      overflowY: "auto",
      padding: theme.spacing(2, 2),
      margin: theme.spacing(0, 2),
    },
    smallRoot: {
      display: "block",
      width: "100%",
      padding: theme.spacing(1),
      textDecoration: "none",
    },
  })
);


