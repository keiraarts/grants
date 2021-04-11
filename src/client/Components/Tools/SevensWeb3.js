import { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import Web3 from 'web3';

export const connectWallet = () => {
  if (window.ethereum) {
    const createdProvider = window.web3.currentProvider;
    if (!createdProvider.selectedAddress) window.ethereum.enable();
    else {
      const createdSeaport = new OpenSeaPort(createdProvider, {
        networkName: Network.Main
      })

      if (listener && seaport) {
        seaport.removeListener(listener);
      }

      const listener = createdSeaport.addListener(EventType.CreateOrder, ({ transactionHash, event }) => {
        setSellOpen(false);
      });

      setListener(listener);
      setProvider(createdProvider);
      setSeaport(createdSeaport);
      getBalance(createdProvider.selectedAddress, createdSeaport);
    }
  }
}

export default function Resizer() {
  const setSmall = useStoreActions(dispatch => dispatch.app.setSmall);
  const setCols = useStoreActions(dispatch => dispatch.app.setCols);

  const resize = () => {
    setResizer(true);
  }

  const [listener, setListener] = useState(false);
  useEffect(() => {
    if (!listener) {
      window.addEventListener('resize', resize);
      setListener(true);
    }
  }, [listener]);

  const [resizing, setResizer] = useState(false);
  useEffect(() => {
    if (resizing) {
      if (window.innerWidth <= 1440) setSmall(true);
      else setSmall(false);

      if (window.innerWidth <= 700) setCols('1');
      else if (window.innerWidth > 700 && window.innerWidth <= 1200) setCols('2');
      else setCols('3')

      setResizer(false);
    }
  }, [resizing]);

  useEffect(() => {
    if (window.innerWidth <= 1440) setSmall(true);
    else setSmall(false);

    if (window.innerWidth <= 700) setCols('1');
    else if (window.innerWidth > 700 && window.innerWidth <= 1200) setCols('2');
    else setCols('3')
  }, [])

  return (null);
}
