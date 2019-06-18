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
import { green } from '@material-ui/core/colors';

const StyledTableCellBig = withStyles(theme => ({
  head: {
    backgroundColor: "#DDDDDD",
    color: theme.palette.common.black,
    width: '30%',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#DDDDDD",
    color: theme.palette.common.black,
    width: '23%',
  },
  body: {
    fontSize: 14,
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
    minWidth: 300,
  },
}));

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
})

const regularFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2
})


export default function TableTrades ({ rows }) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCellBig align="left">Executada em</StyledTableCellBig>
            <StyledTableCell align="left">Tipo</StyledTableCell>
            <StyledTableCell align="left">Quantidade</StyledTableCell>
            <StyledTableCell align="left">Preço Unitário</StyledTableCell>
          </TableRow>
        </TableHead>
        <TransitionGroup component={TableBody}>
          {rows && rows.map((row) => (
            <CSSTransition
              key={row.active_order_code}
              timeout={2000}
              classNames="item"
            >
              <StyledTableRow hover={true} key={row.active_order_code}>
                <StyledTableCell align="left">{new Date(row.date).toLocaleString('pt-BR')}</StyledTableCell>
                <StyledTableCell align="left">{row.type === 'buy' ? <span style={{ color: 'green' }}>Compra</span> : <span style={{ color: 'red' }}>Venda</span>}</StyledTableCell>
                <StyledTableCell align="left">{regularFormatter.format(row.amount)}</StyledTableCell>
                <StyledTableCell align="right">{formatter.format(row.unit_price)}</StyledTableCell>
              </StyledTableRow>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
    </Paper>
  );
}
