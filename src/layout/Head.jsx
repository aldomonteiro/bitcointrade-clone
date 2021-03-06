import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
});

function pairName (pair) {
  return pair.substring(3, 6) + '/' + pair.substring(0, 3);
}

function mapStateToProps (state) {
  return {
    ticker: state.reduxSaga.ticker
  };
}

const Head = ({ ticker }) => {
  let strTitle = 'BitcoinTrade Clone';
  if (ticker && ticker.data.length > 0)
    if (ticker.data[0])
      strTitle = `(${pairName(ticker.data[0].pair)}) ${formatter.format(ticker.data[0].last_transaction_unit_price)}`;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{strTitle}</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Helmet>
  );
}

export default connect(
  mapStateToProps,
)(Head);