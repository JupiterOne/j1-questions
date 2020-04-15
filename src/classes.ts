import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const useQuestionDisplayStyles = makeStyles((/* theme: Theme */) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '75%',
      padding: '2%',
      marginLeft: '1%'
    },
    paper: {
      padding: '1%',
      marginBottom: '0.5%'
    }
  }),
);

export const useFilterStyles = makeStyles((/* theme: Theme */) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '16%',
      padding: '2%'
    }
  }),
);
