import React from "react";
import { NextSeo } from "next-seo";
import CurationPortal from "../src/client/Components/Curation/Portal";

export default function Curation() {
  return (
    <div className="content-block">
      <NextSeo
        title="Curate on Sevens Foundation"
        description=" Sevens Foundation is a non-profit organization committed to helping artists."
      />
      <CurationPortal />
    </div>
  );
}
