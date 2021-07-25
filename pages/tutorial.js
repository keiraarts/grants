import React from "react";
import { NextSeo } from "next-seo";
import Tutorial from "../src/client/Components/Tutorials/Wallet";

export default function DonatePage() {
  return (
    <div className="content-block">
      <NextSeo
        title="Setting up a Wallet"
        description="Sevens Foundation is a non-profit organization committed to helping artists."
      />
      <Tutorial />
    </div>
  );
}
