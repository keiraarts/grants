import React from "react";
import "../src/client/styles.scss";
import Header from "../src/client/Components/Header";
import Footer from "../src/client/Components/Footer";
import { StoreComponent, store } from "../src/client/redux";

import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return (
    <StoreComponent store={store}>
      <div className="App">
        <div className="wrapper" />
        <div className="dim-gradient">
          <div className="site-content">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </div>
    </StoreComponent>
  );
}

/* console.log(`
  Stay humble, stay sats.
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
`); */

export default MyApp;
