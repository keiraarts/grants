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
        The Sevens Genesis Grant was founded by <span className='text-grey pointer' onClick={ () => openLink('https://twitter.com/illestrater_') }>Tim Kang</span> through
        the heart of <span className='text-grey pointer' onClick={ () => openLink('https://twitter.com/darlington') }>Mike Darlington</span>.
        We are a <Link to='/committee' className='text-grey remove-a'>committee</Link> who believes in shining a spotlight to those who demonstrate dedication and talent but are not deservingly recognized.
        <br /><br />
        In the past, digital art in and of itself has not been given the renown it deserves pertaining to the broader scope of traditional art forms.
        This will change because of the paradigm of being able to sell and own digital assets using blockchain.
        <br /><br />
        Amazing artists have entered this blooming world of NFTs and are establishing a name for themselves, regardless of their prior track record of success.
        But, so many talented people have yet to discover this burgeoning opportunity at hand.
        <br /><br />
        Currently, the available resources for an artist to learn about and take their first steps into this world are scattered, daunting, and expensive.
        We provide these tools and initial funding to newcomers who are eager to participate and jump start their career through their passions for creativity.
        <br /><br />
        There are also concerns over carbon footprint; fortunately this will be resolved when platforms migrate to scalable solutions. In the meantime
        we will offset the emissions produced by every NFT we mint by <span className='text-grey remove-a' onClick={ () => openLink('https://teamtrees.org/') }>planting trees</span>.
        We also have a shared love for equality and want to especially highlight BIPOC.
        <br /><br />
        We believe in a bright future for artistry across the globe, and we are all grounded by a drive to create a foundation
        and welcome others into this future through our shared love for art, music, and design.
        <br /><br />
      </div>
    </div>
  );
}