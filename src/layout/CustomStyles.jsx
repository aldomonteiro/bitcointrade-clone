import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    //   background: {
    //     default: '#000000',
    //     paper: '#000000'
    //   },
    primary: {
      main: '#000000',
      dark: '#000000',
      light: '#FFFFFF'
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#000000',
      light: '#FFFFFF'
    },
  },
});

export default theme;
