import {
  LOAD_ORDERS_ERROR, LOAD_TICKER_ERROR, LOAD_TRADES_ERROR,
  LOAD_ORDERS_LOADING, LOAD_TICKER_LOADING, LOAD_TRADES_LOADING,
  LOAD_ORDERS_SUCCESS, LOAD_TRADES_SUCCESS, LOAD_TICKER_SUCCESS
} from "./actions";

const initialState = {
  data: [],
  ticker: null,
  loading_orders: false,
  loading_ticker: false,
  error: ''
};

export default function reduxSagaReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS_LOADING: {
      return {
        ...state,
        loading_orders: true,
        error: ''
      };
    }
    case LOAD_TICKER_LOADING: {
      return {
        ...state,
        loading_ticker: true,
        error: ''
      };
    }
    case LOAD_ORDERS_SUCCESS: {
      const bids = action.data.data.bids.slice(1, 50);
      const asks = action.data.data.asks.slice(1, 50);
      const newData = { bids: bids, asks: asks }
      return {
        ...state,
        data: newData,
        loading_orders: false
      }
    }
    case LOAD_ORDERS_ERROR: {
      return {
        ...state,
        loading_orders: false,
        error: action.error
      };
    }
    case LOAD_TRADES_SUCCESS: {
      const trades = action.data.data.trades.map((element, index) => {
        element.key = element.passive_order_code + element.active_order_code;
        return element;
      });

      return {
        ...state,
        trades: trades,
        loading_trades: false
      }
    }
    case LOAD_TRADES_ERROR: {
      return {
        ...state,
        error: action.error,
        loading_trades: false
      }
    }
    case LOAD_TICKER_SUCCESS: {
      return {
        ...state,
        ticker: action.data,
        loading_ticker: false
      }
    }
    case LOAD_TICKER_ERROR: {
      return {
        ...state,
        loading_ticker: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
