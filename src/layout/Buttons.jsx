import React from 'react';
import { Button } from '@material-ui/core';

const Buttons = ({ selected, onClick }) => {
  return (
    <div>
      <Button size="small" variant={selected === 0 ? "contained" : "outlined"} onClick={() => onClick(0)}>
        Todas
      </Button>
      <Button size="small" variant={selected === 1 ? "contained" : "outlined"} onClick={() => onClick(1)}>
        Minhas
      </Button>
    </div>
  );
};

export default Buttons;