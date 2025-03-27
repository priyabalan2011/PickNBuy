import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HelmetProvider} from 'react-helmet-async';
import store from './store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <HelmetProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </HelmetProvider>
  //</React.StrictMode>
);


