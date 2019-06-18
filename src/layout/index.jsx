import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import MyAppBar from './MyAppBar';
import theme from './CustomStyles';

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <MyAppBar />
      </div>
    </ThemeProvider>
  );
};

export default Index;