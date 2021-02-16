import React from 'react';
import ReactDOM from 'react-dom';
import { StoreComponent, store } from './redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import useScroll from '@react-hooks-custom/use-scroll'
import LoadBackground from './Components/Canvas';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Gallery from "./Components/Gallery";
import Ethos from "./Components/Ethos";
import FAQ from "./Components/FAQ";
import Tutorial from "./Components/Tutorials/Tutorial";
import Rarible from "./Components/Tutorials/Rarible";
import OpenSea from "./Components/Tutorials/OpenSea";
import Committee from "./Components/Committee";
import Donate from "./Components/Donate";
import Program from "./Components/Program";
import Apply from "./Components/Apply";
import Curation from "./Components/Curation";

import './styles.scss';

const App = () => {  
  // const { scrollX, scrollY } = useScroll();

  return (
    <Router>
      <div className='App'>
        <StoreComponent store={store}>
          <div className='dim-gradient'>
          {/* <div className='dim-gradient'> */}
            <div className='site-content'>
              <Header />
              <Route path="/" exact component={ Gallery } />
              <Route path="/ethos" exact component={ Ethos } />
              <Route path="/nft" exact component={ FAQ } />
              <Route path="/tutorial" exact component={ Tutorial } />
              <Route path="/rarible" exact component={ Rarible } />
              <Route path="/opensea" exact component={ OpenSea } />
              <Route path="/committee" exact component={ Committee } />
              <Route path="/donate" exact component={ Donate } />
              <Route path="/program" exact component={ Program } />
              <Route path="/apply" exact component={ Apply } />
              <Route path="/curation" exact component={ Curation } />
              <Footer/>
            </div>
          </div>
          <div className='background-gradient' />
          {/* <canvas id='canvas' width='3' height='3'></canvas>
          <LoadBackground /> */}
        </StoreComponent>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
