import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Buttons from '../layout/Buttons';
import useInterval from '../utils/UseInterval';
import TableOrders from './TableOrders';

import { loadOrders } from "../sagas/actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

function GridOrders ({ loadOrders, data, loading }) {
  const classes = useStyles();
  const [selectedBids, setSelectedBids] = useState(0);
  const [selectedAsks, setSelectedAsks] = useState(0);
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  function handleSelectedBids (selected) {
    setSelectedBids(selected);
  }

  function handleSelectedAsks (selected) {
    setSelectedAsks(selected)
  }

  useInterval(() => {
    loadOrders('BRLBTC');

    if (!loading) {
      setBids(data.bids)
      setAsks(data.asks)
    }
  }, 5000);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div className={classes.title}>
              <Typography variant="h4" noWrap>
                Ordens de Compra
              </Typography>
              <Buttons selected={selectedBids} onClick={handleSelectedBids} />
            </div>
            <TableOrders rows={selectedBids === 0 ? bids : []} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div className={classes.title}>
              <Typography variant="h4" noWrap>
                Ordens de Venda
              </Typography>
              <Buttons selected={selectedAsks} onClick={handleSelectedAsks} />
            </div>
            <TableOrders rows={selectedAsks === 0 ? asks : []} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  data: state.reduxSaga.data,
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