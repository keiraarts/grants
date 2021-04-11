import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../styles.scss';

import Up from '../assets/up.png';
import Down from '../assets/down.png';

function openLink(page)
{
  let win = window.open(page, '_blank');
  win.focus();
}

const Block = ({ title, text }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='margin-top'>
      <div className='flex pointer faq-title-container' onClick={ () => setOpen(!open) }>
        <div className='text-m flex-full faq-title'>
          { title }
        </div>
        <img src={ open ? Up : Down } className='faq-toggle' />
      </div>
      <div className='line-spacer' />
      { open &&
        <div className='text-s margin-top-s'>
          { text }
        </div>
      }
    </div>
  )
}

export default function Committee() {

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        <strong>Learn</strong>
      </div>
      <div className='text-s margin-top-s'>
        There's a new future for art?
      </div>
      <div className='page-container margin-top'>
        <div className='text-l text-b'>
          <strong>NFT FAQ</strong>
        </div>
        <Block title='What is an NFT?' text='An NFT, or a Non-Fungible Token, represents a single asset with ownership. This asset can represent many things ranging
            from concert tickets to video game items, but we believe art is the most important piece of the puzzle.' />
        <Block title='Who owns it?' text='There is a single owner (usually) and it cannot be controlled by anyone else.
          It can be transferred or exchanged for currency, and its history of owners, known as provenance, is all recorded forever.' />
        <Block title='What exactly does provenance mean?' text={ `An NFT's ownership history and its unique properties are reliably tracked on a blockchain, namely Ethereum.
          This data is public which means that anyone can provably verify its origination, prior, and current owners.` } />
        <Block title='What makes an NFT so profound?' text={ `Due to the nature of the blockchain, it can be globally exchanged with another without any middlemen or friction
          with its provenance available as absolute source of truth.
          There is now a global market for virtually any digital asset.` } />
        <Block title={ `Can't someone just copy and paste artwork?` } text={ `Yes, and in this context that's a good thing as that means that artwork is being shared and more visible. But that person does not own the asset!
          Downloading and owning a file is vastly different than owning an NFT, for reasons mentioned above.` } />
        <div className='margin-top-l text-l text-b'>
          <strong>About Sevens Foundation</strong>
        </div>
        <Block title='What makes Sevens unique to NFTs?' text='We provide a curation framework for curators to view art submissions with little emphasis on prior success
          through tools such as optional blind voting and single art submissions. Although the story of an artist is also important, we believe great art should speak for itself and 
          are rooted in elevating emerging and undiscovered talent.' />
        <Block title='Can I mint freely here?' text={ `Sevens is not an open minting platform. We believe in curation through a unified theme & experience similar to how traditional art galleries present
          artworks. We work on a single art submission-per-exhibition basis and leave it up to the curators to decide what is minted. Each exhibition seeks different criteria and if you meet them you are
          free to submit your artwork to be potentially curated into the exhibition.` } />
        <Block title='Do artists receive royalties?' text={ `Currently and unfortunately no. We 100% believe in perpetual royalties for artists as it is key to empowering artists
          and we will introduce this feature as soon as we are able to, but we have made a careful decision not to at this time.` } />
        <Block title='How may I collect artwork on Sevens?' text={ `You may do so completely within our website. We use OpenSea's API so the bidding, listing, and auction mechanics
          are the same as OpenSea's - but everything works in-house. We do not present historical sales data on Sevens because we believe that immediately presenting a valuation creates bias
          towards the art piece, but you may certainly find that info on OpenSea.` } />
        <div className='margin-top-l text-l text-b'>
          <strong>Technical FAQ</strong>
        </div>
        <Block title='How decentralized is Sevens?' text={ `Decentralization is a core ethos of ours because it is the paradigm that makes NFTs powerful. Curators create NFT collections (ERC721)
          with their own wallet and provide Sevens permission to mint on their behalf - they can revoke this permission after the exhibition is minted
          or at any time. We do not have custody and all NFTs are minted directly to the artist or the curator themselves depending on the grant structure. That being said, centralization is important to the extent
          that it makes sense, and our curation tooling and website are parts of the platform that we control and update. It is currently too difficult to operate this all on decentralized 
          services but we will migrate when it is possible.` } />
        <Block title={ `Where are the NFT's art assets stored?` } text={ `We believe in asset permanence, and that all artworks should live forever. We are not confident IPFS provides this promise and
          have chosen to store all assets on Arweave which is an incentivized file storage blockchain which brings more confidence and guarantees that the artworks will exist permanently. Shout out to j1mmy.eth
          for pioneering the advocacy.` } />
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
        <a className='text-grey pointer margin-top' onClick={ () => openLink('https://parishilton.com/why-im-excited-about-nfts/') }>Paris Hilton's "I'm Excited About NFTs—You Should Be Too"</a><br />
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