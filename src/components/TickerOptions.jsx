import React from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import TickerField from '../layout/TickerField';
import { CircularProgress } from '@material-ui/core';

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

const TickerOptions = ({ ticker, loading, handleClick }) => {
  return loading ? <CircularProgress /> : (
    <div style={{ width: 2000 }}>
      <Table>
        <TableBody>
          {ticker && ticker.map((t, index) =>
            <StyledTableRow key={index} onClick={() => handleClick(t)}>
              <StyledTableCell>
                {pairName(t.pair)}
              </StyledTableCell>
              <StyledTableCell>
                <TickerField simple green currency={false} value={t && (1 - (t.data.low / t.data.high)) * 100} />
              </StyledTableCell>
              <StyledTableCell>
                <TickerField simple value={t && t.data.last} />
              </StyledTableCell>
              <StyledTableCell>
                <TickerField simple value={t && t.data.low} />
              </StyledTableCell>
              <StyledTableCell>
                <TickerField simple value={t && t.data.high} />
              </StyledTableCell>
              <StyledTableCell>
                <TickerField simple currency={false} value={t && t.data.volume} />
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table></div>);
  // options.map((option, index) =>
  //   <div className={classes.container} key={index}>
  //     <div className={classes.line}>
  //       <Button className={classes.button} onClick={() => handleClick(option)}>
  //         {option}
  //       </Button>

  //       <TickerField label="ÚLTIMA" value={ticker && ticker.last} />
  //       <TickerField label="MENOR" value={ticker && ticker.low} />
  //       <TickerField label="MAIOR" value={ticker && ticker.high} />
  //       <TickerField label="VOLUME (24H)" currency={false} value={ticker && ticker.volume} />
  //     </div>
  //   </div>
  // );
};

function mapStateToProps (state) {
  return {
    ticker: state.reduxSaga.ticker,
    loading: state.reduxSaga.loading,
  };
}

export default connect(
  mapStateToProps,
)(TickerOptions);