import { all, put, take, fork, delay, cancelled, cancel, call } from 'redux-saga/effects'
import {
  LOAD_ORDERS_ERROR, LOAD_TICKER_ERROR, LOAD_TRADES_ERROR,
  LOAD_ORDERS_LOADING, LOAD_TICKER_LOADING, STOP_API_LOADING,
  LOAD_ORDERS_SUCCESS, LOAD_TRADES_SUCCESS, LOAD_TICKER_SUCCESS, STOP_TICKER_LOADING
} from "./actions";
import Api from '../api'

async function fetchAsync (func, param) {
  const response = await func(param);

  if (response.ok) {
    return await response.json();
  }

  console.dir(response)
  throw new Error(response.error);
}

function* fetchAPIOrders (action) {
  while (true) {
    try {

      // const orders = yield fetchAsync(Api.getOrders, action.payload);
      // const trades = yield fetchAsync(Api.getTrades, action.payload);
      // const tickers = yield fetchAsync(Api.getTicker)

      const { orders, trades, tickers } = yield all({
        orders: fetchAsync(Api.getOrders, action.payload),
        trades: fetchAsync(Api.getTrades, action.payload),
        // tickers: fetchAsync(Api.getTicker)
      })

      yield put({ type: LOAD_ORDERS_SUCCESS, data: orders });
      yield put({ type: LOAD_TRADES_SUCCESS, data: trades });
      // yield put({ type: LOAD_TICKER_SUCCESS, data: tickers });
      yield delay(5000);
    } catch (e) {
      console.log('Saga Error', e);
      // TODO identify which actions threw an error
      yield put({ type: LOAD_ORDERS_ERROR, error: e.message });
      yield delay(20000)
    } finally {
      if (yield cancelled()) {
        console.log('Saga cancelled..');
        break;
      }
    }

  }
}

function* fetchAPITicker () {
  while (true) {
    try {
      const tickers = yield fetchAsync(Api.getTicker)
      yield put({ type: LOAD_TICKER_SUCCESS, data: tickers });
      yield delay(5000);
    } catch (e) {
      console.log('Saga Error', e);
      // TODO identify which actions threw an error
      yield put({ type: LOAD_TICKER_ERROR, error: e.message });
      yield delay(20000)
    } finally {
      if (yield cancelled()) {
        console.log('Saga ticker cancelled..');
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
    const params = yield take(LOAD_ORDERS_LOADING);
    const bgSyncTask = yield fork(fetchAPIOrders, params);
    yield take(STOP_API_LOADING);
    yield cancel(bgSyncTask);
  }
}

export function* tickerSaga () {
  // Allows concurrent fetches of users
  // yield takeEvery(LOAD_ORDERS_LOADING, fetchOrders);
  while (true) {
    // Does not allow concurrent fetches of users
    yield take(LOAD_TICKER_LOADING);
    const bgSyncTask = yield fork(fetchAPITicker);
    yield take(STOP_TICKER_LOADING);
    yield cancel(bgSyncTask);
  }
}

export default function* rootSaga () {
  yield all([
    fork(ordersSaga),
    fork(tickerSaga),
  ]);
}