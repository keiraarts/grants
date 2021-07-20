import React from "react";
import { NextSeo } from "next-seo";
import Committee from "../src/client/components/committee";

export default function TeamPage() {
  return (
    <>
      <NextSeo
        title="Seven's Foundation"
        description="Our shared love of art, music, and design. Sevens Foundation was created by Tim Kang through the heart of Mike Darlington. We are a global and 501(c)3 non-profit organization with a mission to spotlight emerging artists and share their creativity with the world."
      />
      <Committee />
    </>
  );
}
