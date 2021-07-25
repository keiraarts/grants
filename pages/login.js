import React from "react";
import { NextSeo } from "next-seo";
import Login from "../src/client/Components/Login";

export default function LoginPage() {
  return (
    <>
      <NextSeo
        title="Login Grants"
        description="View your account and previously minited NFTs."
      />

      <Login />
    </>
  );
}
