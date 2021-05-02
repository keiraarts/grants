import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { StoreComponent, store } from "./redux";
import { useStoreRehydrated } from "easy-peasy";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import ScrollToTop from "./Components/Tools/ScrollToTop";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Ethos from "./Components/Ethos";
import Learn from "./Components/Learn";
import Tutorial from "./Components/Tutorials/Wallet";
import Rarible from "./Components/Tutorials/Rarible";
import OpenSea from "./Components/Tutorials/OpenSea";
import Committee from "./Components/Committee";
import Donate from "./Components/Donate";
import Program from "./Components/Program";
import CreateProgram from "./Components/CreateProgram";
import Apply from "./Components/Apply";
import Organizer from "./Components/Curator";
import Curation from "./Components/Curation/Portal";
import Testimony from "./Components/Testimony";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Forgot from "./Components/Forgot";
import RecoverAccount from "./Components/RecoverAccount";
import Account from "./Components/Account";
import Profile from "./Components/Profile";
import Exhibition from "./Components/Exhibition";
import VerifyEmail from "./Components/VerifyEmail";

import "./styles.scss";

const App = () => {
  function WaitForStateRehydration({ children }) {
    const isRehydrated = useStoreRehydrated();
    return isRehydrated ? children : null;
  }

  const scrollRef = useRef(null);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <StoreComponent store={store}>
        <div className="App">
          <div className="wrapper" />
          <div className="dim-gradient" ref={scrollRef}>
            <div className="site-content">
              <WaitForStateRehydration>
                <Header />
                <Switch>
                  <Route
                    path="/"
                    component={Home}
                    scrollRef={scrollRef ? scrollRef.current : null}
                  />

                  <Route path="/learn" exact component={Learn} />
                  <Route path="/tutorial" exact component={Tutorial} />
                  <Route path="/rarible" exact component={Rarible} />
                  <Route path="/opensea" exact component={OpenSea} />
                  <Route path="/team" exact component={Committee} />
                  <Route path="/donate" exact component={Donate} />
                  <Route path="/program" exact component={Program} />
                  <Route path="/create-program" component={CreateProgram} />
                  <Route path="/apply/:program" exact component={Apply} />
                  <Route path="/curator/:org" exact component={Organizer} />
                  <Route path="/curation" exact component={Curation} />
                  <Route path="/testimony" exact component={Testimony} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/forgotpassword" exact component={Forgot} />
                  <Route
                    path="/recoveraccount/:token"
                    component={RecoverAccount}
                  />
                  <Route path="/account" exact component={Account} />
                  <Route path="/u/:username" component={Profile} />
                  <Route path="/verifyemail/:id" component={VerifyEmail} />
                  <Route path="/:url/:id" component={Exhibition} />
                  <Route path="/:url" component={Exhibition} />
                </Switch>
                <Footer />
              </WaitForStateRehydration>
            </div>
          </div>
        </div>
      </StoreComponent>
    </BrowserRouter>
  );
};

console.log(`
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥&&&&&&&&&&&&&&&&&&&&&&♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&♥♥♥♥♥
♥♥♥♥♥&&&%%%%####################%%%%&&&♥♥♥♥
♥♥♥♥&&&&(                          .&&&&♥♥♥
♥♥♥&&&&&(                         ,%&&&&♥♥♥
♥♥♥&&&&&(   /%%%%%%%%%%%%%%##%#  ,%%&&&&♥♥♥
♥♥♥♥&&&&(  *%%%%%%%%%%%%%%%%%#  ,%%&&&&♥♥♥♥
♥♥♥♥♥&&&#**%&&&&&&&&&&%%%%%%#  *%%&&&&♥♥♥♥♥
♥♥♥♥♥♥♥♥&&&&&&&&&&&&&&&&%%%#  *%&&&&&♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&&&&%(  (&&&&&&♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&&&/  /&&&&&&♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&&*  (&&&&&&♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&&*  /%&&&&&♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&%.  *%&&&&&♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&%,  .%&&&&&♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&%%.   %%&&&&&♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&%%.   *%%&&&&&♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥&&&&%%.    (%%&&&&♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥&&&&%*     .%%&&&&♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥&&&&%        &&&&&♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&*      .&&&&♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&&#(&&&&&&♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥&&&&&&&&♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥

`);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  rootElement
);
