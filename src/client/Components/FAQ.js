import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

export default function FAQ() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        NFT FAQ
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
        <br />
      </div>
    </div>
  );
}