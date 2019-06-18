import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';

export default function TabBuySell ({ value, handleChange }) {
  return (
    <Tabs value={value} onChange={handleChange}>
      {/* <Tab label={<Typography color="primary">Comprar</Typography>} />
      <Tab label={<Typography color="primary">Vender</Typography>} /> */}
      <Tab label="Comprar" />
      <Tab label="Vender" />
    </Tabs>
  );
}
