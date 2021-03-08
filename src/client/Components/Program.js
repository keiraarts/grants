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
        Why should an artist apply?
      </div>
      <div className='page-container margin-top ethos-text'>
        Sevens Genesis Grant will mint and transfer your single editioned artwork to you as part of The Sevens Genesis Grant collection
        as well as provide additional funds to proceed with your first ever sale.
        <br /><br />
        We will highlight you and your work as being a grant recipient and provide the means necessary in order for you to become
        an independent and self-sustainable artist on various NFT platforms available.
        <br /><br />
        Not only will you receive funding and resources but also special NFTs and gifts by commissioned or donating artists
        as well as an invitation to a community of your fellow recipients and a grand welcome into the industry.
        <br /><br />
        We seek quality work with a proven track record of a passion for art, regardless of your current recognition with a preference
        to those who are determined to seek aid for starting their self-sovereign career.
        <div className='text-s margin-top'>
          <span className='text-grey remove-a'>Applications are closed</span>
        </div>
        <br />
      </div>
    </div>
  );
}