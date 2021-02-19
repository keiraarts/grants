import React from 'react';
import { Link } from "react-router-dom";

import '../../styles.scss';

export default function Tutorial() {
  function openLink(page)
  {
    let win = window.open(page, '_blank');
    win.focus();
  }

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Getting Started
      </div>
      <div className='text-s margin-top-s text-desc'>
        I would like to mint an NFT on my own!
      </div>
      <div className='text-s margin-top text-desc'>
        There are many benefits of the grant outside of funding,
        but we want everyone to have the knowledge to make their best decisions and pave their own path.
      </div>
      <div className='page-container margin-top'>
        <div className='text-m'>
          1) Get MetaMask
        </div>
        <div className='text-s margin-top-s'>
          Premiere NFT platforms run on Ethereum. Ones where you can get started right away are <span className='pointer text-grey' onClick={ () => openLink('https://rarible.com') }>Rarible</span> and <span className='pointer text-grey' onClick={ () => openLink('https://opensea.io') }>OpenSea</span>.
          <br /><br />
          MetaMask is the recommended wallet to interact with these platforms as well as other apps on Ethereum.
          Get the <span className='pointer text-grey' onClick={ () => openLink('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn') }>Chrome Extension</span>.
        </div>
        <div className='text-m margin-top'>
          2) Setup Your Wallet on MetaMask
        </div>
        <div className='text-s margin-top-s'>
          Go through the setup process on MetaMask. It will ask you to write down 12 words and keep it in a safe place - it is HIGHLY recommended to do this as
          this is your password and access key.
          <br /><br />
          If you would like better security options, consider getting a <span className='pointer text-grey' onClick={ () => openLink('https://medium.com/radartech/hardware-wallets-explained-da8bd93ce801') }>hardware wallet</span>.
        </div>
        <div className='text-m margin-top'>
          3) Fund Your MetaMask Wallet
        </div>
        <div className='text-s margin-top-s'>
          To mint, transfer, or exchange an NFT or currency (i.e. a transaction), it will cost a fee to use the network. This fee is called "gas" on Ethereum
          in which you pay using the crypto currency Ether (ETH). In your wallet, you will see a deposit address (e.g. 0x777Bc2a...) in your MetaMask.
          <br /><br />Purchase ETH on a crypto currency exchange, such as Coinbase, Gemini or Binance, and withdraw to this deposit address.
        </div>
        <br />
      </div>
    </div>
  );
}