import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function TabMenu ({ value, handleChange, className }) {
  return (
    <Tabs className={className} value={value} onChange={handleChange}>
      <Tab label="Mercado" />
      <Tab label="Gráfico" />
    </Tabs>
  );
}
