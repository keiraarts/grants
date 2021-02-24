import React from 'react';
import ReactDOM from 'react-dom';
import { StoreComponent, store } from './redux';
import { BrowserRouter, Route } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Gallery from "./Components/Gallery";
import Ethos from "./Components/Ethos";
import FAQ from "./Components/FAQ";
import Resources from "./Components/Resources";
import Tutorial from "./Components/Tutorials/Wallet";
import Rarible from "./Components/Tutorials/Rarible";
import OpenSea from "./Components/Tutorials/OpenSea";
import Committee from "./Components/Committee";
import Donate from "./Components/Donate";
import Program from "./Components/Program";
import Apply from "./Components/Apply";
import Curation from "./Components/Curation";
import Register from "./Components/Register";
import Testimony from "./Components/Testimony";
import Contract from "./Components/Contract";

import './styles.scss';

const App = () => {
  return (
    <BrowserRouter onChange={() => { window.scrollTo(0, 0); console.log('YEO') }}>
      <StoreComponent store={store}>
        <div className='App'>
          <div className='dim-gradient'>
            <div className='site-content'>
              <Header />
              <Route path="/" exact component={ Gallery } />
              <Route path="/ethos" exact component={ Ethos } />
              <Route path="/nft" exact component={ FAQ } />
              <Route path="/resources" exact component={ Resources } />
              <Route path="/tutorial" exact component={ Tutorial } />
              <Route path="/rarible" exact component={ Rarible } />
              <Route path="/opensea" exact component={ OpenSea } />
              <Route path="/committee" exact component={ Committee } />
              <Route path="/donate" exact component={ Donate } />
              <Route path="/program" exact component={ Program } />
              <Route path="/apply" exact component={ Apply } />
              <Route path="/curation" exact component = {Curation } />
              <Route path="/testimony" exact component={ Testimony } />
              <Route path="/contract" exact component={ Contract } />
              <Route path="/register" exact component={ Register } />
              <Footer/>
            </div>
          </div>
        </div>
      </StoreComponent>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>
, rootElement);
