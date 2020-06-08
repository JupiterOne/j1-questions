import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: theme.palette.text.primary
    },
    homeLink: {
      height: 35.38,
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        width: 35.38,
        overflow: "hidden",
      },
    },
    menuButton: {
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
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
      [theme.breakpoints.down('xs')]: {
        display: "none"
      },
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
        flex: 5,
        minWidth: 0,
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
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
      [theme.breakpoints.down('sm')]: {
        flex: 2,
        maxHeight: "none",
      },
    },
    smallRoot: {
      display: "block",
      width: "100%",
      padding: theme.spacing(1),
      textDecoration: "none"
    },
    questionsCard: {
      [theme.breakpoints.down('sm')]: {
        borderRadius: theme.spacing(0, 0, 0.5, 0.5),
        margin: 0,
        order: 3,
      },
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
      borderRadiusBottomRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        borderRadius: theme.spacing(),
      },
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
      [theme.breakpoints.down('md')]: {
        flexFlow: "wrap",
      },
      [theme.breakpoints.down('sm')]: {
        flexFlow: "nowrap",
      },
    },
    tagsPaper: {
      [theme.breakpoints.down('sm')]: {
        borderRadius: 0,
        borderBottom: `solid 1px ${theme.palette.divider}`, 
        borderTop: `solid 1px ${theme.palette.divider}`, 
        order: 2,
      },
    },
    tags: {
      margin: theme.spacing(1.625, 1, 2),
      [theme.breakpoints.down('md')]: {
        marginTop: 0,
      },
    },
    tag: {
      fontFamily: 'Lato',
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
    },
    button: {
      padding: theme.spacing(1)
    },
    buttonGroup: {
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(2, 0, 1),
        width: "100%",
      },
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        width: "35%",
      },
      "& button": {
        [theme.breakpoints.down('md')]: {
          flex: 1,
        },
      }
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
        order: 3,
      },
    },
    root: {
      borderRadius: theme.spacing(0.5, 0, 0, 0.5),
      flex: 4,
      overflowX: "auto",
      padding: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        order: 2,
        borderRadius: theme.spacing(0, 0, 0.5, 0.5),
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
      width: "92.5%",
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      },
    },
    queryDescLayout: {
      display: "flex",
    },
    description: {
      color: theme.palette.text.secondary,
      fontSize: 18,
      marginBottom: theme.spacing(2.5),
      width: "92.5%",
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      },
    },
    descriptionDark: {
      color: "#8690a8",
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
      "@media (max-width: 1470px)": {
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
      [theme.breakpoints.down('md')]: {
        alignItems: "center",
        borderRadius: theme.spacing(0.5, 0.5, 0, 0),
        borderBottom: "solid 1px #d4d6e3",
        display: "flex",
        flexFlow: "wrap",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        justifyContent: "space-between",
      },
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
      [theme.breakpoints.down('md')]: {
        borderBottom: "solid 1px #00062a",
      },
      '&:before': {
        background: "rgba(0, 6, 42, 0.2)",
      }
    },
    integrationGroup: {
      alignItems: 'center',
      display: 'flex',
      margin: theme.spacing(0, 2, 2, 0),
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1.5),
        flex: "100%",
      },
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
    tags: {
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(-0.5, 0, 0, 0),
        textAlign: "right",
      },
      [theme.breakpoints.down('sm')]: {
        textAlign: "left",
      },
    },
    tag: {
      fontFamily: 'Lato',
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
    },
  })
  );
  