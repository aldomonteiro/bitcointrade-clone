import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TickerField from '../layout/TickerField';

const StyledTableCell = withStyles(theme => ({
  body: {
    // backgroundColor: theme.palette.common.black,
    width: 150,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.common.black,
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.black,
    },
    '&:hover': {
      backgroundColor: '#303030'
    }
  },
}))(TableRow);

function pairName (pair) {
  return pair.substring(3, 6) + '/' + pair.substring(0, 3);
}

const TickerTable = ({ ticker, handleClose }) => {
  return (
    <Table>
      <TableBody>
        {ticker && ticker.data && ticker.data.map((t, index) =>
          <StyledTableRow key={index} onClick={(evt) => handleClose(evt, t)}>
            <StyledTableCell align="left">
              {pairName(t.pair)}
            </StyledTableCell>
            <StyledTableCell align="left">
              <TickerField simple color percent currency={false} value={t && (1 - (t.unit_price_24h / t.last_transaction_unit_price)) * 100} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <TickerField simple value={t && t.last_transaction_unit_price} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <TickerField simple value={t && t.min_price} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <TickerField simple value={t && t.max_price} />
            </StyledTableCell>
            <StyledTableCell align="left">
              <TickerField simple currency={false} value={t && t.volume_24h} />
            </StyledTableCell>
          </StyledTableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TickerTable;