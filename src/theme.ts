import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(22, 150, 172)',
      contrastText: '#FFF'
    },
    secondary: {
      main: 'rgb(26, 166, 195)',
      contrastText: '#FFF'
    }
  },
});

export default theme;
