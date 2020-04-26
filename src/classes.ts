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
      position: 'relative',
      left: theme.spacing(-1)
    },
    search: {
      margin: 'auto',
    },
    input: {
      position: 'relative',
      color: theme.palette.text.primary,
      marginLeft: theme.spacing(0.5),
      height: theme.spacing(5),
      maxWidth: theme.spacing(50)
    },
    inputSelected: {
      borderColor: 'linear-gradient(0.6turn, rgb(234, 254, 65), rgb(22, 150, 172))'
    },
    icon: {
      marginRight: theme.spacing(1)
    },
    actionButton: {
      marginLeft: theme.spacing(1)
    },
    headerPart: {
      flexGrow: 1,
      display: 'flex'
    },
    alignRight: {
      flexDirection: 'row-reverse'
    },
    thin: {
      fontWeight: 100,
    },
    bold: {
      fontWeight: 500,
      fontFamily: "Lato"
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
    smallRoot: {
      display: 'block',
      width: '100%',
      padding: theme.spacing(1),
      marginTop: '1%',
      marginBottom: '1%',
      textDecoration: 'none'
    },
    item: {
      flexGrow: 1,
      padding: '1%',
      marginBottom: '0.5%',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    chip: {
      marginRight: theme.spacing(0.5)
    },
    arrow: {
      position: 'relative',
      top: theme.spacing(0.5)
    }
  }),
);

export const useFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '16%',
      padding: theme.spacing(1)
    },
    smallRoot: {
      display: 'block',
      width: '100%',
      padding: theme.spacing(1),
      marginTop: '1%',
      textDecoration: 'none'
    },
    filterSection: {
      borderRadiusBottomLeft: theme.spacing(1),
      borderRadiusBottomRight: theme.spacing(1)
    },
    notFlex: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        display: 'block'
      }
    },
    section: {
      display: 'flex',
      '& > *' : {
        display: 'inline-block'
      }
    },
    flexWrap: {
      flexWrap: 'wrap'
    },
    tag: {
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      // color: 'rgb(224, 244, 55)'
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
      paddingLeft: theme.spacing(1)
    },
    tag: {
      marginLeft: theme.spacing(0.5)
    }
  }),
);
