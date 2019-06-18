import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 110
  },
  green: {
    color: '#4EF442',
    fontWeight: 'bold',
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
  }
})
);


const TickerField = ({ label, value, simple, currency = true, color, percent }) => {
  const classes = useStyles();

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  const regularFormatter = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2
  })

  return (
    <div className={clsx(!simple && classes.container)}>
      {label && (<Typography variant="body1">{label}</Typography>)}
      {typeof value !== 'undefined' && (<Typography className={clsx(color && (value > 0 ? classes.green : value < 0 ? classes.red : null))} variant="h6">
        {currency ? currencyFormatter.format(value) : percent ? regularFormatter.format(value) + '%' : regularFormatter.format(value)}
      </Typography>)
      }
    </div >
  );
};

export default TickerField;