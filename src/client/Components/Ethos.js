import React from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function Ethos() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Ethos
      </div>
      <div className='text-s margin-top-s'>
        Origins, motivations, and vision
      </div>
      <div className='page-container margin-top ethos-text'>
        Sevens Genesis Grant was founded by Tim Kang through the heart of Mike Darlington.
        We are a global <Link to='/committee' className='text-rainbow remove-a'>committee</Link> with a mission to spotlight emerging artists and share their creativity with the world.
        <br /><br />
        Since its inception digital art as a medium has not received the respect or renown it deserves in the traditional fine art world.
        We believe this paradigm is at a crucial tipping point with the advent of blockchain technology designed to allow digital creations to be securely authenticated, sold and owned.
        <br /><br />
        A talented and intrepid cast of artists have already entered the world of NFTs and are quickly establishing themselves in this burgeoning realm. 
        As the space rapidly matures, the breadth of opportunity is expanding; the NFT community is primed to welcome more creative people and have them embrace the opportunity at hand.
        <br /><br />
        Currently, the available resources for artists looking to become informed and take their first steps into this world are scattered, daunting, and expensive.
        Sevens Genesis Grant will provide these tools and initial fundings to newcomers who are eager to participate and jump start their journey exploring their passion for creativity.
        <br /><br />
        Sevens Genesis Grant understands and shares the concerns regarding blockchains carbon footprint; this will be resolved in the near future on a systemic level when platforms migrate to scalable solutions.
        In the meantime we will offset the emissions produced by each and every NFT we mint by planting trees in partnership with <span className='text-grey remove-a pointer' onClick={ () => openLink('https://teamtrees.org/') }>#teamtrees</span>.
        We are also deeply committed to equality and will focus on promoting and advancing the creative output of the BIPOC and LGBTQ+ communities.
        <br /><br />
        Our foundation believes in a bright future for artistry across the globe, and we are excited to welcome others into this new era through our shared passion for art, music, and design.
        <br /><br />
        We give much gratitude to our <Link to='/donate' className='text-grey remove-a' onClick={ () => window.scrollTo(0, 0) }>donors</Link>.
        <br /><br />
      </div>
    </div>
  );
}