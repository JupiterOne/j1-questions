import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: theme.palette.text.primary
    },
    homeLink: {
      height: 35.38,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.text.primary,
      width: theme.spacing(20)
    },
    title: {
      marginLeft: theme.spacing(3.125),
      color: "#6b758a",
      flexGrow: 1,
      fontSize: 13,
      lineHeight: 1,
      marginTop: theme.spacing(-0.25),
      textTransform: "uppercase",
    },
    search: {
      margin: "auto"
    },
    input: {
      position: "relative",
      color: theme.palette.text.primary,
      minWidth: theme.spacing(45),
    },
    inputSelected: {
      borderColor:
        "linear-gradient(0.6turn, rgb(234, 254, 65), rgb(22, 150, 172))"
    },
    icon: {
      marginRight: theme.spacing(1)
    },
    actionButton: {
      marginLeft: theme.spacing(1)
    },
    headerPart: {
      flexGrow: 1,
      display: "flex"
    },
    alignRight: {
      flexDirection: "row-reverse"
    },
    thin: {
      fontWeight: 100
    },
    bold: {
      fontWeight: 500,
      fontFamily: "Lato"
    }
  })
);

export const useQuestionDisplayStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 3.5,
      height: 'calc(100vh - 99px)',
      padding: theme.spacing(1),
      margin: theme.spacing(0, 2),
      textDecoration: "none",
      overflowY: 'auto',
      [theme.breakpoints.down('md')]: {
        flex: 2
      },
    },
    smallRoot: {
      display: "block",
      width: "100%",
      padding: theme.spacing(1),
      textDecoration: "none"
    },
    heading: {
      fontWeight: 900,
      color: theme.palette.primary.main,
    },
    item: {
      flexGrow: 1,
      padding: theme.spacing(1),
      textDecoration: "none",
      cursor: "pointer"
    },
    divider: {
      margin: theme.spacing(0, -1),
    },
    chip: {
      marginRight: theme.spacing(0.5)
    },
    question: {
      alignItems: 'center',
      display: 'flex',
    },
    chevronRight: {
      color: theme.palette.primary.main,
      marginTop: theme.spacing(-0.5),
    }
  })
);

export const useFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      height: 'calc(100vh - 99px)',
      overflowY: 'auto',
      padding: theme.spacing(1),
    },
    smallRoot: {
      display: "block",
      width: "100%",
      padding: theme.spacing(1),
      textDecoration: "none"
    },
    filterSection: {
      borderRadiusBottomLeft: theme.spacing(1),
      borderRadiusBottomRight: theme.spacing(1)
    },
    divider: {
      margin: theme.spacing(0, -1, 2),
    },
    subtitle: {
      color: "#8e97ab",
      flex: 1,
      fontSize: 12,
      fontWeight: 700,
      marginTop: theme.spacing(0.625),
      letterSpacing: 1.6,
      textTransform: "uppercase",
    },
    icon: {
      color: "#8e97ab",
      margin: theme.spacing(0, 1, 0, 0.75),
    },
    checkboxItem: {
      display: "flex",
      alignItems: "flex-start",
    },
    checkboxLabel: {
      lineHeight: 1.25,
      marginTop: theme.spacing(1.375),
    },
    section: {
      display: "flex",
    },
    tags: {
      margin: theme.spacing(1.25, 1, 2),
    },
    tag: {
      fontFamily: 'Lato',
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5)
    },
    button: {
      padding: theme.spacing(1)
    },
    linkText: {
      color: "#BBC"
    },
  })
  );
  
  export const useQuestionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4)
    },
    description: {
      background: "rgba(0,0,0, 0.05)",
      borderRadius: theme.spacing(1)
    },
    title: {
      display: "flex",
      "& > *": {
        flexGrow: 1
      },
    },
    titleText: {
      width: "85%"
    },
    copy: {
      verticalAlign: "center",
      height: theme.spacing(6),
      width: theme.spacing(6)
    },
    copyContainer: {
      verticalAlign: "top"
    },
    button: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(0.75),
    },
    queryBox: {
      paddingLeft: theme.spacing(1)
    },
    tag: {
      fontFamily: 'Lato',
      marginLeft: theme.spacing(0.5)
    }
  })
  );
  