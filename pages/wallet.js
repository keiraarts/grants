import React from "react";
import { NextSeo } from "next-seo";
import Wallet from "../src/client/components/tutorials/wallet";

export default function WalletTutorial() {
  return (
    <>
      <NextSeo
        title="Wallet"
        description="MetaMask is the recommended wallet to interact with NFT platforms as well as other apps on Ethereum."
      />

      <Wallet />
    </>
  );
}
