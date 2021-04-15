import React, { useEffect, useState } from 'react';
import { OpenSeaPort, Network, EventType } from 'opensea-js';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function WalletConnect() {
  const setProvider = useStoreActions(dispatch => dispatch.eth.setProvider);

  function connectWallet() {
    if (window.ethereum) {
      const provider = window.ethereum;
      if (provider.selectedAddress) {
        setProvider(provider);
      } else {
        setProvider(null);
      }
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