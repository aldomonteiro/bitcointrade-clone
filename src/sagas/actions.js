export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_TRADES_SUCCESS = 'LOAD_TRADES_SUCCESS';
export const LOAD_TICKER_SUCCESS = 'LOAD_TICKER_SUCCESS';
export const LOAD_TICKER_LOADING = 'LOAD_TICKER_LOADING';
export const LOAD_TRADES_LOADING = 'LOAD_TRADES_LOADING';
export const LOAD_ORDERS_LOADING = 'LOAD_ORDERS_LOADING';
export const STOP_API_LOADING = 'STOP_API_LOADING';
export const STOP_TICKER_LOADING = 'STOP_TICKER_LOADING';
export const LOAD_TRADES_ERROR = 'LOAD_TRADES_ERROR';
export const LOAD_TICKER_ERROR = 'LOAD_TICKER_ERROR';
export const LOAD_ORDERS_ERROR = 'LOAD_ORDERS_ERROR';

export const loadOrders = (pair) => {
  return {
    type: LOAD_ORDERS_LOADING,
    payload: pair
  };
}

export const loadTicker = () => {
  return {
    type: LOAD_TICKER_LOADING
  };
}

export const stopApi = () => {
  return {
    type: STOP_API_LOADING,
  };
}
