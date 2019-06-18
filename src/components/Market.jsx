import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TabBuySell from './TabBuySell';
import Buy from './Buy';
import GridOrders from './GridOrdersRedux';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#FFFFFF',
  },
}));


const Market = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const logged = false;

  function handleChange (event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.container}>
      {logged && (<>
        <Typography color="primary" variant="h3">
          Mercado BTC/BRL
      </Typography>
        <TabBuySell value={value} handleChange={handleChange} />
        {value === 0 && <Buy />}
      </>)}
      <GridOrders />
    </div>
  );
};

export default Market;