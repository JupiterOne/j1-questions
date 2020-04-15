import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: '#FFF'
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
    item: {
      flexGrow: 1,
      padding: '1%',
      marginBottom: '0.5%'
    },
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

export const useQuestionStyles = makeStyles((/* theme: Theme */) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '1%',
      padding: '2%'
    },
    description: {
      padding: '1%',
      background: 'rgba(0,0,0, 0.05)'
    },
    title: {
      display: 'flex',
      '& > *': {
        flexGrow: 1,
      },
      marginBottom: '0.5%'
    },
    titleText: {
      width: '85%'
    }
  }),
);
