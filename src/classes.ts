import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.text.primary,
      verticalAlign: 'center',
      position: 'relative',
      top: '1.5px',
      width: theme.spacing(5)
    },
    title: {
      flexGrow: 1,
    },
    input: {
      position: 'relative',
      color: theme.palette.text.primary,
      width: theme.spacing(22),
      marginLeft: theme.spacing(0.5)
    },
    inputIcon: {
      marginRight: theme.spacing(1)
    }
  }),
);

export const useQuestionDisplayStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '60%',
      padding: theme.spacing(1),
      marginLeft: '1%',
      textDecoration: 'none'
    },
    item: {
      flexGrow: 1,
      padding: '1%',
      marginBottom: '0.5%',
      textDecoration: 'none'
    },
  }),
);

export const useFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '16%',
      padding: theme.spacing(1)
    },
    notFlex: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        display: 'block'
      }
    },
    flexWrap: {
      flexWrap: 'wrap'
    },
    title: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    tag: {
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5)
    },
    button: {
      padding: theme.spacing(1)
    },
    linkText: {
      color: '#BBC',
    },
    icon: {
      paddingRight: theme.spacing(0.5)
    }
  }),
);

export const useQuestionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '1%',
      padding: theme.spacing(4)
    },
    description: {
      padding: '1%',
      background: 'rgba(0,0,0, 0.05)',
      borderRadius: theme.spacing(1)
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
    },
    button: {
      // marginLeft: theme.spacing(4),
      marginTop: theme.spacing(2)
    },
    queryBox: {
      display: 'flex',
      flexGrow: 1,
      // '& > *' : {
      //   flexGrow: 1,
      // }
    }
  }),
);
