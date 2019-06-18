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


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
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

function PopperTicker ({ ticker, loading, handleClick, stopApi, loadOrders }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [opt, setOpt] = React.useState(null);
  const anchorRef = React.useRef(null);

  function handleToggle () {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose (event, ticker) {
    if (open) {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpt(ticker);
      setOpen(false);
      if (ticker) {
        stopApi();
        loadOrders(ticker.pair);
      }
    }
  }

  useEffect(() => {
    if (!opt && ticker && ticker.data)
      setOpt(ticker.data[0])
  });

  return (
    <div className={classes.root}>
      <Button ref={anchorRef} className={classes.button} onClick={handleToggle}>
        {open ? (<><ChevronLeftIcon color="secondary" /> <span>Voltar</span></>) :
          (<><ExpandMoreIcon color="secondary" /><span>{opt && pairName(opt.pair)}</span></>)}
      </Button>
      <div className={classes.flex}>
        <div className={classes.line}>
          <TickerField label="VARIAÇÃO" />
          <TickerField label="ÚLTIMA" />
          <TickerField label="MENOR" />
          <TickerField label="MAIOR" />
          <TickerField label="VOLUME (24H)" />
        </div>
        {!open && opt &&
          <div className={classes.line}>
            <TickerField color currency={false} percent value={opt && (1 - (opt.unit_price_24h / opt.last_transaction_unit_price)) * 100} />
            <TickerField value={opt && opt.last_transaction_unit_price} />
            <TickerField value={opt && opt.min_price} />
            <TickerField value={opt && opt.max_price} />
            <TickerField currency={false} value={opt && opt.volume_24h} />
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
      </Popper>
    </div>
  );
}

function mapStateToProps (state) {
  return {
    ticker: state.reduxSaga.ticker,
    loading: state.reduxSaga.loading,
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
