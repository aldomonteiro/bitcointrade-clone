import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const ranges = [
  {
    value: 'Limitada',
    label: 'Limitada',
  },
  {
    value: 'Mercado',
    label: 'Mercado',
  },
];

const useStyles = makeStyles(theme => ({
  input: {
    height: '15px',
    padding: '10px 0px 10px 10px',
  },
  textField: {
    margin: theme.spacing(1),
    height: 5,
    width: 200,
    padding: 0,
  }
}));

export default function SelectField () {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    orderType: '',
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <TextField
      select
      variant="outlined"
      className={classes.textField}
      value={values.orderType}
      onChange={handleChange('orderType')}
      InputProps={{ classes: { input: classes.input } }}
    >
      {ranges.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>);
}