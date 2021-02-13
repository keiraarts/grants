import { getFips } from 'crypto';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../baseUrl';

import '../styles.scss';

let provider;

export default function Curation() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);

  function connectWallet() {
    if (window.ethereum) {
      console.log('testing');
      window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
      const signer = provider.getSigner();
      signer.getAddress().then(add => { setAddress(add); setConnected(true) });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          connectWallet();
        })
      }

      connectWallet();
    }, 1000)
  }, []);

  return (
    <div className='content-block'>
      <div className='text-l text-b'>
        Committee Curation
      </div>
      <div className='text-s margin-top-s text-desc'>
        Let's move people forward.
      </div>
      <div className='margin-top'>
        { connected ?
          <div className='text-s'>
            { address }<br />
            <span className='text-s margin-top-s text-grey pointer' onClick={ () => setConnected(false) }>Disconnect Wallet</span>
          </div>
        :
          <div className='text-s'>
            <span className='text-s margin-top-s text-grey pointer' onClick={ () => connectWallet() }>Connect Wallet</span>
          </div>
        }
      </div>
    </div>
  );
}