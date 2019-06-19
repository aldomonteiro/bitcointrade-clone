import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './TableOrders.css';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#DDDDDD",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: '#DDDDDD',
    // },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
  },
}));

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
})

export default function TableOrders ({ rows }) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Quantidade</StyledTableCell>
            <StyledTableCell align="left">Preço Unitário</StyledTableCell>
          </TableRow>
        </TableHead>
        <TransitionGroup component={TableBody}>
          {rows && rows.map((row) => (
            <CSSTransition
              key={row.code}
              timeout={2000}
              classNames="item"
            >
              <StyledTableRow hover={true} key={row.code}>
                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                <StyledTableCell align="left">{formatter.format(row.unit_price)}</StyledTableCell>
              </StyledTableRow>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
    </Paper>
  );
}
