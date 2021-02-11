import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StoreComponent, store } from './redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import useScroll from '@react-hooks-custom/use-scroll'
import LoadBackground from './Components/Canvas';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Gallery from "./Components/Gallery";
import FAQ from "./Components/FAQ";
import Ethos from "./Components/Ethos";
import Committee from "./Components/Committee";
import Program from "./Components/Program";
import Apply from "./Components/Apply";

import './styles.scss';

const App = () => {  
  const { scrollX, scrollY } = useScroll();
  console.log(scrollX, scrollY);

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
              <Route path="/committee" exact component={ Committee } />
              <Route path="/program" exact component={ Program } />
              <Route path="/apply" exact component={ Apply } />
              <Footer/>
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
