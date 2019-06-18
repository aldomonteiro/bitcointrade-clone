import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

function NumberFormatCustom (props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      decimalSeparator=','
      thousandSeparator='.'
      isNumericString={true}
      decimalScale={2}
      prefix="R$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
  input: {
    height: '15px',
    padding: '10px 0px 10px 10px',
  },
  textField: {
    margin: theme.spacing(1),
  }
}));


export default function NumberField () {
  const [values, setValues] = React.useState({
    numberformat: '0',
  });
  const classes = useStyles();

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <TextField
      className={classes.textField}
      variant="outlined"
      value={values.numberformat}
      onChange={handleChange('numberformat')}
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom,
        classes: { input: classes.input }
      }}
    />
  );
}
