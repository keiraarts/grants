import React from "react";
import { NextSeo } from "next-seo";
import Learn from "../src/client/components/learn";

export default function LearnComponent() {
  return (
    <>
      <NextSeo
        title="Learn how to mint NFTs"
        description="Open your MetaMask extension and connect it to the OpenSea marketplace with Grants."
      />

      <Learn />
    </>
  );
}
