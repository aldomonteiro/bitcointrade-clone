import React from 'react';
import { Provider } from 'react-redux';
import Index from './layout';
import { configureStore } from "./store/configureStore";
import Head from './layout/Head';

const store = configureStore();

function App () {
  return (
    <div>
      <Provider store={store}>
      <header>
        <Head />
      </header>
        <Index />
      </Provider>
    </div>
  );
}

export default App;
