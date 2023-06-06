import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/app.scss'
import { BrowserRouter } from "react-router-dom";
import {store} from './redux/store';
import { Provider } from 'react-redux';

const roots = document.getElementById('root');

if(roots){
  const root = ReactDOM.createRoot(roots);


  root.render(
    <BrowserRouter>
      <Provider store={store}>
        {/* <React.StrictMode> */}
              <App />
        {/* </React.StrictMode> */}
      </Provider>
    </BrowserRouter>
  );
}



