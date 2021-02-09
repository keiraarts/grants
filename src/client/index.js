import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePromise } from 'promise-hook';
import { StoreComponent, store } from './redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadBackground from './Components/Canvas';
import Gallery from "./Components/Gallery";
import FAQ from "./Components/FAQ";
import Ethos from "./Components/Ethos";

import './styles.css';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <StoreComponent store={store}>
          <div className='dim-gradient'>
            <div className='site-content'>
              <Header />
              <Route path="/" exact component={ Gallery } />
              <Route path="/nft" exact component={ FAQ } />
              <Route path="/ethos" exact component={ Ethos } />
              {/* <Gallery /> */}
              <div className='spacer' />
            </div>
          </div>
          <canvas id='canvas' width='3' height='3'></canvas>
          <LoadBackground />
        </StoreComponent>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
