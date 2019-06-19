const API_BASE_ADDRESS = 'https://api.bitcointrade.com.br/v2/public';
const API_MARKET_ADDRESS = 'https://api.bitcointrade.com.br/v2/market';
const apikey = process.env.REACT_APP_API_KEY;
console.log(apikey);
export const options = ['BRLBTC', 'BRLETH', 'BRLLTC', 'BRLBCH', 'BRLXRP']


export default class Api {
  static getOrders (pair) {
    const uri = API_BASE_ADDRESS + `/${pair}/orders`;

    return fetch(uri, {
      method: 'GET'
    });
  }

  static getTicker () {
    // const uri = API_BASE_ADDRESS + `/${pair}/ticker`;
    const pairs = options.join(',');
    const uri = API_MARKET_ADDRESS + `/summary?pairs=${pairs}`;

    return fetch(uri, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiToken ${apikey}`,
      },
      method: 'GET'
    });
  }

  static getTrades (pair) {
    const now = new Date();
    now.setHours(now.getHours(), 59, 59, 59);
    const past = new Date();
    past.setTime(now.getTime() - (24 * 60 * 60 * 1000))

    const strNow = now.toISOString();
    const strPast = past.toISOString();

    const uri = API_BASE_ADDRESS + `/${pair}/trades?start_time=${strPast}&end_time=${strNow}&page_size=49&current_page=1`;

    return fetch(uri, {
      method: 'GET'
    });
  }
}