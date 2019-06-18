export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_TRADES_SUCCESS = 'LOAD_TRADES_SUCCESS';
export const LOAD_TICKER_SUCCESS = 'LOAD_TICKER_SUCCESS';
export const LOAD_API_LOADING = 'LOAD_API_LOADING';
export const STOP_API_LOADING = 'STOP_API_LOADING';
export const LOAD_API_ERROR = 'LOAD_API_ERROR';

export const loadOrders = (pair) => {
  return {
    type: LOAD_API_LOADING,
    payload: pair
  };
}

export const loadTicker = (pair) => {
  return {
    type: LOAD_API_LOADING,
    payload: pair
  };
}

export const stopApi = () => {
  return {
    type: STOP_API_LOADING,
  };
}
