import React from "react";
import { NextSeo } from "next-seo";
import OpenSea from "../src/client/components/tutorials/opensea";

export default function RaribleTutorial() {
  return (
    <>
      <NextSeo
        title="Minting on OpenSea"
        description="Open your MetaMask extension and connect it to the OpenSea marketplace with Grants."
      />

      <OpenSea />
    </>
  );
}
