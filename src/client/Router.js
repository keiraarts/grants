import React from "react";
import Gallery from "./Components/Gallery";
import FAQ from "./Components/FAQ";

const routes = {
  "/": () => <Gallery />,
  "/nft": () => <FAQ />,
};

export default routes;
