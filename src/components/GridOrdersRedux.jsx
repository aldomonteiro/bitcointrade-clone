import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import TableOrders from './TableOrders';

import { loadOrders } from "../sagas/actions";
import TableTrades from './TableTrades';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  green: { color: '#3A8A02' },
  red: { color: '#8A0204' },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

function GridOrders ({ loadOrders, data, loading, trades }) {
  const classes = useStyles();
  const [selectedBids, setSelectedBids] = useState(0);
  const [selectedAsks, setSelectedAsks] = useState(0);

  useEffect(() => {
    loadOrders('BRLBTC');
  }, []);

  function handleSelectedBids (selected) {
    setSelectedBids(selected);
  }

  function handleSelectedAsks (selected) {
    setSelectedAsks(selected)
  }

  return (
    <div className={classes.root}>
      {loading ?
        <div style={{ width: '100%' }}>
          <Box display="flex" p={1} justifyContent="center" bgcolor="background.paper">
            <CircularProgress />
          </Box>
        </div> : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <div className={classes.title}>
                  <Typography variant="h4" className={classes.green} noWrap>
                Ordens de Compra
                  </Typography>
                </div>
                <TableOrders rows={selectedBids === 0 ? data.bids ? data.bids : [] : []} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <div className={classes.title}>
                  <Typography variant="h4" className={classes.red} noWrap>
                Ordens de Venda
                  </Typography>
                </div>
                <TableOrders rows={data.asks || []} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <div className={classes.title}>
                  <Typography variant="h4" className={classes.red} noWrap>
                Ordens executadas
                  </Typography>
                </div>
                <TableTrades rows={trades || []} />
              </Paper>
            </Grid>
          </Grid>
        )}
    </div>
  );
}

const mapStateToProps = state => ({
  data: state.reduxSaga.data,
  trades: state.reduxSaga.trades,
  loading: state.reduxSaga.loading,
  error: state.reduxSaga.error,
});

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: bindActionCreators(loadOrders, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridOrders);