import React from "react";
import { NextSeo } from "next-seo";
import Ethos from "../src/client/Components/Ethos";

export default function EthosPage() {
  return (
    <div className="content-block">
      <NextSeo
        title="Grants Ethos"
        description=" Sevens Foundation was created by Tim Kang through the heart of Mike Darlington. We are a global and 501(c)3 non-profit organization with a mission to spotlight emerging artists and share their creativity with the world."
      />
      <Ethos />
    </div>
  );
}
