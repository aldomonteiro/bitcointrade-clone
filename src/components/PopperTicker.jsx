import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TickerTable from './TickerTable';

import TickerField from '../layout/TickerField';
import { loadOrders, stopApi } from "../sagas/actions";
import { Box, CircularProgress } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    width: '100vw',
    zIndex: theme.zIndex.drawer + 2,
  },
  innerTable: {
    backgroundColor: theme.palette.common.black,
    paddingLeft: '2%',
    paddingRight: '20%'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: 100,
    marginRight: theme.spacing(3),
    color: theme.palette.primary.light,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

function pairName (pair) {
  return pair.substring(3, 6) + '/' + pair.substring(0, 3);
}

function PopperTicker ({ ticker, loading_ticker, handleClick, stopApi, loadOrders }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tickerIndex, setTickerIndex] = React.useState(0);
  const anchorRef = React.useRef(null);

  function handleToggle () {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose (event, index) {
    if (open) {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setTickerIndex(index);
      setOpen(false);
      stopApi();
      loadOrders(ticker.data[index].pair);
    }
  }

  return (
    <div className={classes.root}>
      {loading_ticker ?
        <div className={classes.loader}>
          <Box display="flex" p={1} justifyContent="center" bgcolor="primary">
            <CircularProgress color="secondary" />
          </Box>
        </div> : (<>
          <Button ref={anchorRef} className={classes.button} onClick={handleToggle}>
            {open ? (<><ChevronLeftIcon color="secondary" /> <span>Voltar</span></>) :
              (<><ExpandMoreIcon color="secondary" /><span>{ticker && pairName(ticker.data[tickerIndex].pair)}</span></>)}
          </Button>
          <div className={classes.flex}>
            <div className={classes.line}>
              <TickerField label="VARIAÇÃO" />
              <TickerField label="ÚLTIMA" />
              <TickerField label="MENOR" />
              <TickerField label="MAIOR" />
              <TickerField label="VOLUME (24H)" />
            </div>
            {!open && ticker &&
              <div className={classes.line}>
                <TickerField color currency={false} percent value={(1 - (ticker.data[tickerIndex].unit_price_24h / ticker.data[tickerIndex].last_transaction_unit_price)) * 100} />
                <TickerField value={ticker.data[tickerIndex].last_transaction_unit_price} />
                <TickerField value={ticker.data[tickerIndex].min_price} />
                <TickerField value={ticker.data[tickerIndex].max_price} />
                <TickerField currency={false} value={ticker.data[tickerIndex].volume_24h} />
              </div>
            }
          </div>
          <Popper open={open} anchorEl={anchorRef.current} transition>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper className={classes.paper} id="menu-list-grow">
                  <ClickAwayListener onClickAway={handleClose}>
                    <div className={classes.innerTable}>
                      <TickerTable ticker={ticker} handleClose={handleClose} />
                    </div>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper></>)}
    </div>
  );
}

function mapStateToProps (state) {
  return {
    ticker: state.reduxSaga.ticker,
    loading_ticker: state.reduxSaga.loading_ticker,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    stopApi: bindActionCreators(stopApi, dispatch),
    loadOrders: bindActionCreators(loadOrders, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopperTicker);
