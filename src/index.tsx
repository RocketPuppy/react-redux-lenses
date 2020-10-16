import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import Checklist from "./Checklist";

import { reducer } from "./ducks";

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Checklist />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
