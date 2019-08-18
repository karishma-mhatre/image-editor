import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './Reducers';
import { Provider } from 'react-redux';
import ImageResizer from './Components/ImageResizer/ImageResizer';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Header from './Components/Header/Header';
import { HashRouter as Router, Route } from "react-router-dom";
import thunk from 'redux-thunk';
import './Styles/common.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <div className="App">
        <Router>
          <Route exact path="/" component={ImageResizer}></Route>
          <Route exact path="/gallery" component={ImageGallery}></Route>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
