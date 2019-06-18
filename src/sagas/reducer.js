import {
  LOAD_API_ERROR, LOAD_API_LOADING, LOAD_ORDERS_SUCCESS, LOAD_TRADES_SUCCESS, LOAD_TICKER_SUCCESS
} from "./actions";

const initialState = {
  data: [],
  loading: false,
  error: ''
};

export default function reduxSagaReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_API_LOADING: {
      return {
        ...state,
        loading: true,
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
        loading: false
      }
    }
    case LOAD_API_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case LOAD_TRADES_SUCCESS: {
      return {
        ...state,
        trades: action.data.data.trades,
        loading: false
      }
    }
    case LOAD_TICKER_SUCCESS: {
      return {
        ...state,
        ticker: action.data,
        loading: false
      }
    }
    default: {
      return state;
    }
  }
}
