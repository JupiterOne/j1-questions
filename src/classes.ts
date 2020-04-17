import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: 'rgb(22, 150, 172)'// 'linear-gradient(0.6turn, white 40%, rgb(22, 150, 172) 30% 50%)'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: '#FFF'
    },
    title: {
      flexGrow: 1,
    },
    input: {
      background: 'rgb(12, 140, 162)',
      borderColor: 'white',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      color: 'white'
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
      height: theme.spacing(60),
      overflowY: 'scroll'
    },
    item: {
      flexGrow: 1,
      padding: '1%',
      marginBottom: '0.5%'
    },
  }),
);

export const useFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '16%',
      padding: theme.spacing(1),
      height: theme.spacing(60),
      overflowY: 'scroll',
      minWidth: theme.spacing(20)
    },
    notFlex: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        display: 'block'
      }
    },
    title: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    tags: {
      maxHeight: theme.spacing(32),
      overflowY: 'scroll',
    },
    button: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      paddingTop: theme.spacing(3),
      textDecoration: 'none',
      width: '100%'
    },
    linkText: {
      color: '#BBC',
    }
  }),
);

export const useQuestionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '1%',
      padding: theme.spacing(1)
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
