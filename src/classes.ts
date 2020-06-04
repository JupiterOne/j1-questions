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
      color: "#007797",
      flexGrow: 0.6,
      fontSize: 13,
      letterSpacing: 1.6,
      lineHeight: 1,
      marginTop: theme.spacing(-0.25),
      textTransform: "uppercase",
    },
    titleDark: {
      color: "#26cbe5",
    },
    search: {
      margin: "auto"
    },
    input: {
      background: "#eff0f5",
      borderRadius: theme.spacing(0.5),
      color: theme.palette.text.primary,
      height: 40,
      minWidth: theme.spacing(45),
      padding: "10.5px 8px 10.5px 14px",
      position: "relative",
      [theme.breakpoints.down('md')]: {
        marginLeft: "auto",
        marginRight: theme.spacing(-1),
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: theme.spacing(35),
      },
      "& ::-webkit-search-cancel-button": {
        "-webkit-appearance": "none",
        cursor: "pointer",
        height: 20,
        width: 20,
        backgroundImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg%3E%3Cline x1='15' y1='5' x2='5' y2='15' fill='none' stroke='%237a849c' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3Cline x1='5' y1='5' x2='15' y2='15' fill='none' stroke='%237a849c' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E%0A")`,
      },
    },
    inputDark: {
      background: "#00062a",
      color: "#e2e4ea",
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
      maxHeight: "calc(100vh - 99px)",
      padding: theme.spacing(1, 2, 2),
      margin: theme.spacing(0, 2),
      textDecoration: "none",
      overflowY: "auto",
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
    headingBox: {
      margin: theme.spacing(3, 1, 2),
      "&:first-of-type": {
        marginTop: theme.spacing(0.75),
      }
    },
    heading: {
      fontWeight: 900,
      color: theme.palette.primary.main,
    },
    results: {
      background: "#eff0f5",
      borderRadius: theme.spacing(2),
      color: theme.palette.text.secondary,
      position: "sticky",
      top: theme.spacing(1.5),
      marginRight: theme.spacing(1),
      padding: theme.spacing(0.25, 1.5),
      float: "right",
      zIndex: 2,
    },
    resultsDark: {
      background: "#00062a",
    },
    item: {
      flexGrow: 1,
      fontSize: 15,
      padding: theme.spacing(1),
      textDecoration: "none",
      cursor: "pointer"
    },
    divider: {
      margin: theme.spacing(0, -2),
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
      maxHeight: "calc(100vh - 99px)",
      overflowY: "auto",
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
      marginTop: theme.spacing(0.5),
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
      marginTop: theme.spacing(0.5),
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
    container: {
      display: "flex",
      [theme.breakpoints.down('md')]: {
        flexFlow: "column",
      },
    },
    root: {
      borderRadius: theme.spacing(0.5, 0, 0, 0.5),
      flex: 4,
      overflowX: "auto",
      padding: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        order: 2
      },
    },
    title: {
      display: "flex",
    },
    titleText: {
      color: "#0096ad",
      fontWeight: 900,
      lineHeight: 1.25,
      marginTop: theme.spacing(-0.5),
    },
    queryDescLayout: {
      display: "flex",
    },
    description: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
      },
    },
    queries: {
      flex: 4,
      marginTop: theme.spacing(2.125),
    },
    queryGroup: {
      display: "flex",
    },
    copy: {
      verticalAlign: "center",
      height: theme.spacing(6),
      width: theme.spacing(6)
    },
    copyContainer: {
      marginTop: theme.spacing(0.375),
    },
    button: {
      paddingLeft: theme.spacing(0.75),
      position: "absolute",
      left: 24,
      [theme.breakpoints.down('md')]: {
        position: "static",
        marginBottom: theme.spacing(2),
      },
    },
    queryBox: {
      paddingLeft: theme.spacing(1),
    },
    sidebar: {
      borderRadius: theme.spacing(0, 0.5, 0.5, 0),
      flex: 1,
      padding: theme.spacing(4),
      position: "relative",
      '&:before': {
        background: "rgba(227, 229, 239, 0.2)",
        display: "block",
        content: `""`,
        height: "100%",
        position: "absolute",
        width: "100%",
        left: 0,
        top: 0,
      }
    },
    sidebarDark: {
      '&:before': {
        background: "rgba(0, 6, 42, 0.2)",
      }
    },
    integrationGroup: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: theme.spacing(2.5),
    },
    integrationIcon: {
      marginRight: theme.spacing(1.5),
      height: 48,
      width: 48,
    },
    integrationTitle: {
      color: theme.palette.text.secondary,
      fontSize: 18,
      fontWeight: 900,
    },
    tag: {
      fontFamily: 'Lato',
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
    },
  })
  );
  