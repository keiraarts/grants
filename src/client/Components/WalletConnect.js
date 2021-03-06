import React, { useEffect, useState } from 'react';

let provider;

export default function WalletConnect() {
  function connectWallet() {
    if (window.ethereum) {
      provider = window.web3.currentProvider;
      console.log('BRUH', provider.selectedAddress);
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

  return (<></>);
}