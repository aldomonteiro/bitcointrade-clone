import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NumberField from './NumberField';
import { FormControl, FormLabel } from '@material-ui/core';
import Tippy from '@tippy.js/react';
import SelectField from './SelectField';
import Info from '../layout/info.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    border: '1px solid'
  },
  labelInfo: {
    display: 'flex',
  }
}));

export default function Buy () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl >
        <FormLabel className={classes.formControl} component="legend">Valores em Reais</FormLabel>
        <NumberField />
      </FormControl>
      <FormControl>
        <div className={classes.labelInfo}>
          <FormLabel className={classes.formControl} component="legend">Tipo de Ordem&nbsp;</FormLabel>
          <Tippy content={
            <span>
              <p><b>Como são priorizadas as ordens de compra?</b></p>
              <p>Todos os tipos de ordem, sejam elas limitada, limitada com stop ou mercado, 
                serão sempre executadas priorizando sempre o menor valor possível de venda.</p>
            </span>
          }>
            <img src={Info} alt="Info" />
          </Tippy>
        </div>
        <SelectField />
      </FormControl>
    </div>);
}