import React, { useState } from "react";
import { apiUrl } from "../src/client/baseUrl";

export async function getStaticProps() {
  const res = await fetch(`${apiUrl()}/programs/getPrograms`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const programs = await res.json();

  return {
    props: { programs }, // will be passed to the page component as props
  };
}

export default function Program(props) {
  const [loaded, setLoaded] = useState(false);
  const [programs] = useState(props?.programs);

  return (
    <div className="content-block">
      <div className="text-l text-b">
        <strong>Grants Program</strong>
      </div>
      <div className="text-s margin-top-s text-desc">What is an art grant?</div>
      <div className="page-container margin-top ethos-text">
        Sevens Foundation provides both artists and curators tools for creating
        opportunities to connect through art exhibitions.
        <br />
        <br />
        Grants, at the minimum, covers all costs for publishing artworks as part
        of a show and create a global and collaborative environment for curators
        and artists alike to connect through an integral goal. This allows any
        digital artist, regardless of your background or prior success, the
        potential for their artwork to speak directly to an organization or
        entity and their outreach.
        <br />
        <br />
        Our first grants program, Genesis Grant, included a cohort of 317
        artists from 60 different countries - most of whom have been
        disadvantaged by means beyond their control. This is an ongoing program
        for any artist who have not yet minted an NFT before.
        <br />
        <br />
        All participants share passions for providing equal opportunities and
        lifting others up through visibility, providing for others, and a love
        for creative expression.
        <div className="text-m margin-top-l">
          <strong>Apply for a Grant</strong>
        </div>
        <div className="flex-wrap margin-top">
          {programs.map((program, index) => {
            if (!program.closeApplication) {
              return (
                <a key={index} className="button" to={`/apply/${program.url}`}>
                  <div className="text-xs">{program.organizers[0].name}</div>
                  <span>{program.name}</span>
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
