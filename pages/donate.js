import React from "react";
import { NextSeo } from "next-seo";
import Donate from "../src/client/components/donate";

export default function DonatePage() {
  return (
    <div className="content-block">
      <NextSeo
        title="Donate to Sevens Foundation"
        description=" Sevens Foundation is a non-profit organization committed to helping artists."
      />
      <Donate />
    </div>
  );
}
