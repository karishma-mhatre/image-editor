import React from 'react';
import './App.css';
import { createStore } from 'redux';
import reducer from './Reducers';
import { Provider } from 'react-redux';
import ImageResizer from './Components/ImageResizer/ImageResizer';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import { HashRouter as Router, Route } from "react-router-dom";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={ImageResizer}></Route>
          <Route exact path="/gallery" component={ImageGallery}></Route>
            {/* <ImageResizer></ImageResizer> */}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
