import React from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function Program() {
  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Grants Program
      </div>
      <div className='text-s margin-top-s text-desc'>
        What is an art grant?
      </div>
      <div className='page-container margin-top ethos-text'>
        Sevens Foundation provides both arists and curators tools for creating opportunities to connect through art exhibitions.
        <br /><br />
        Grants, at the minimum, covers all costs for publishing artworks as part of a show and create a global and collaborative environment for
        curators and artists alike to connect through an integral goal. This allows any digital artist, regardless of your background or prior success,
        the potential for their artwork to speak directly to an organization or entity and their outreach.
        <br /><br />
        Our first grants program, Genesis Grant, included a cohort of 318 artists from 60 different countries - most of whom have been disadvantaged by means beyond their control.
        This is an ongoing program for any artist who have not yet minted an NFT before.
        <br /><br />
        All participants share passions for providing equal opportunities and lifting others up through visibility, providing for others, and a love for creative expression.
        <div className='text-m margin-top-l'>
          <strong>Apply for a Grant</strong>
        </div>
        <div className='flex-wrap'>
          <Link className='button' to='/apply/genesis'>
            <div className='text-xs'>Sevens Foundation</div>
            <span>Sevens Genesis Grant</span>
          </Link>
          <Link className='button' to='/apply/giving-back'>
            <div className='text-xs'>Sevens Foundation</div>
            <span>Exhibition: "Giving Back"</span>
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
}