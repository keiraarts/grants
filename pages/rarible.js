import React from "react";
import { NextSeo } from "next-seo";
import Rarible from "../src/client/Components/Tutorials/Rarible";

export default function RaribleTutorial() {
  return (
    <>
      <NextSeo
        title="Minting on Rarible"
        description="Open your MetaMask extension and ensure your correct wallet is selected."
      />

      <Rarible />
    </>
  );
}
