import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useQueryVisualizerStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
      flexFlow: 'column'
    },
  })
);
