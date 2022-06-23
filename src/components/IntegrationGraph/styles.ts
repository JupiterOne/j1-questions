import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useIntegrationGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      height: "calc(100vh - 99px)",
      overflowY: "auto",
      padding: theme.spacing(1),
      flexFlow: 'column'
    },
    smallRoot: {
      display: 'flex',
      width: "100%",
      padding: theme.spacing(1),
      textDecoration: "none",
      flexFlow: 'row'
    },
    graphContainer: {
      height: "calc(100vh - 99px)",
      flex: 3.5
    },
    backButton: {
      paddingLeft: theme.spacing(0.75),
      position: "absolute",
      left: 24,
      "@media (max-width: 1470px)": {
        position: "static",
        marginBottom: theme.spacing(2),
      },
    }
  })
);
