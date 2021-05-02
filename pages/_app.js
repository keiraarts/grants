import React from "react";
import "tailwindcss/tailwind.css";
import "../src/client/styles.scss";

import Header from "../src/client/Components/Header";
import Footer from "../src/client/Components/Footer";
import { StoreComponent, store } from "../src/client/redux";

import Router from "next/router";
import NProgress from "nprogress";

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
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

  return (
    <StoreComponent store={store}>
      <DefaultSeo {...SEO} />
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

export default MyApp;
