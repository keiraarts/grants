import React from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function Committee() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        <strong>NFT FAQ</strong>
      </div>
      <div className='text-s margin-top-s'>
        There's a new future for art?
      </div>
      <div className='page-container margin-top'>
        <div className='text-m'>
          What is an NFT?
        </div>
        <div className='text-s margin-top-s'>
          An NFT, or a Non-Fungible Token, represents a single asset with ownership. This asset can represent many things ranging
          from concert tickets to video game items, but we believe art is the most important piece of the puzzle.
        </div>
        <div className='text-m margin-top'>
          Who owns it?
        </div>
        <div className='text-s margin-top-s'>
          There is a single owner (usually) and it cannot be controlled by anyone else.
          It can be transferred or exchanged for currency, and its history of owners, known as provenance, is all recorded forever.
        </div>
        <div className='text-m margin-top'>
          What exactly does provenance mean?
        </div>
        <div className='text-s margin-top-s'>
          An NFT's ownership history and its unique properties are reliably tracked on a blockchain, namely Ethereum.
          This data is public which means that anyone can provably verify its origination, prior, and current owners.
        </div>
        <div className='text-m margin-top'>
          What makes an NFT so profound?
        </div>
        <div className='text-s margin-top-s'>
          Due to the nature of the blockchain, it can be globally exchanged with another without any middlemen or friction
          with its provenance available as absolute source of truth.
          There is now a global market for virtually any digital asset.
        </div>
        <div className='text-m margin-top'>
          Can't someone just copy and paste my artwork?
        </div>
        <div className='text-s margin-top-s'>
          Yes, and in this context that's a good thing as that means your art is being shared. But that person does not own the asset!
          Downloading and owning a file is vastly different than owning an NFT, for reasons mentioned above.
        </div>
      </div>
      <div className='text-l text-b margin-top'>
        <strong>Resources</strong>
      </div>
      <div className='text-s margin-top-s'>
        Learn more about NFTs
      </div>
      <div className='page-container text-m'>
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://www.youtube.com/watch?v=a8ww4aNlPQU') }>Mankind's "What is an NFT?"</a><br />
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://www.loop-news.com/p/beginners-guide-crypto-art-and-nfts') }>Loopify's Beginners Guide</a><br />
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://coopahtroopa.mirror.xyz/PF42Z9oE_r6yhZN9jZrrseXfHaZALj9JIfMplshlgQ0') }>Coopahtroopa's NFT Landscape</a><br />
        <Link to='/tutorial' className='text-grey remove-a margin-top'>Setting up a wallet</Link><br />
        <Link to='/opensea' className='text-grey remove-a margin-top'>Minting on OpenSea</Link><br />
        <Link to='/rarible' className='text-grey remove-a margin-top'>Minting on Rarible</Link><br />
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://discord.gg/a9dDyUCZWY') }>Maalavidaa's Artist Mental Health Community</a><br />
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://goldstandard.org') }>Reducing Carbon Footprint</a><br />
        <br />
      </div>
    </div>
  );
}