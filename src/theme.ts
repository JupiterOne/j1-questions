import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: 'rgb(22, 150, 172)',
      contrastText: '#FFF'
    }
  },
});

export default theme;
