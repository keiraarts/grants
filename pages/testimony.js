import React from "react";
import { NextSeo } from "next-seo";
import Testimony from "../src/client/Components/Testimony";

export default function TestimonyPage() {
  return (
    <>
      <NextSeo
        title="Testimonials"
        description="Artist lives are changing drastically through NFTs."
      />
      <Testimony />
    </>
  );
}
