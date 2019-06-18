import { all, put, take, fork, delay, cancelled, cancel } from 'redux-saga/effects'
import {
  LOAD_ORDERS_SUCCESS, LOAD_TRADES_SUCCESS, LOAD_TICKER_SUCCESS, LOAD_API_ERROR, LOAD_API_LOADING,
  STOP_API_LOADING
} from "./actions";
import Api, { options } from '../api'

async function fetchAsync (func, param) {
  const response = await func(param);

  if (response.ok) {
    return await response.json();
  }

  console.dir(response)
  throw new Error(response.error);
}

function* fetchAPI (action) {
  while (true) {
    try {

      // const orders = yield fetchAsync(Api.getOrders, action.payload);
      // const trades = yield fetchAsync(Api.getTrades, action.payload);
      // const tickers = yield fetchAsync(Api.getTicker)

      const { orders, trades, tickers } = yield all({
        orders: fetchAsync(Api.getOrders, action.payload),
        trades: fetchAsync(Api.getTrades, action.payload),
        tickers: fetchAsync(Api.getTicker)
      })

      yield put({ type: LOAD_ORDERS_SUCCESS, data: orders });
      yield put({ type: LOAD_TRADES_SUCCESS, data: trades });
      yield put({ type: LOAD_TICKER_SUCCESS, data: tickers });
      yield delay(5000);
    } catch (e) {
      console.log(e);
      yield put({ type: LOAD_API_ERROR, error: e.message });
      yield delay(20000)
    } finally {
      if (yield cancelled()) {
        console.log('Saga cancelled..');
        break;
      }
    }

  }
}

export function* ordersSaga () {
  // Allows concurrent fetches of users
  // yield takeEvery(LOAD_ORDERS_LOADING, fetchOrders);
  while (true) {
    // Does not allow concurrent fetches of users
    const params = yield take(LOAD_API_LOADING)
    const bgSyncTask = yield fork(fetchAPI, params);
    yield take(STOP_API_LOADING);
    yield cancel(bgSyncTask);
  }
}

export default ordersSaga;