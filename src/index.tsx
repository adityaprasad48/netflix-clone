import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { GlobalStyle } from "./styles";

ReactDOM.render(
  <React.StrictMode>
  <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
