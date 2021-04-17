import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

export default function WalletConnect() {
  const setProvider = useStoreActions(dispatch => dispatch.eth.setProvider);

  function connectWallet() {
    if (window.ethereum) {
      const provider = window.web3.currentProvider;
      if (provider.selectedAddress) {
        setProvider({ ...provider });
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