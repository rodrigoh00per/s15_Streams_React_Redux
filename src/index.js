import React from "react";
import ReactDOM from "react-dom";
import ReduxThunk from "redux-thunk";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";

const composeEnhancers =
  window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
