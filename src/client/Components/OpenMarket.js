import React, { useEffect, useState } from 'react';
import { usePromise } from 'promise-hook';
import { useParams } from "react-router-dom";
import { OpenSeaPort, Network, EventType } from 'opensea-js';
import Web3 from 'web3';

import '../styles.scss';

let provider, seaport;

export default function OpenMarket(props) {
  const { id } = useParams();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  
  const asset = props.asset
  const tokenAddress = asset.asset_contract.address;
  const tokenId = asset.token_id;

  const [data, setData] = useState(null);
  function pollBids() {
    fetch(`https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&include_invalid=false&limit=20&offset=0&order_by=created_date&order_direction=desc&asset_contract_address=${ tokenAddress }&token_ids=${ tokenId }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(json => setData(json));
  }

  useEffect(() => {
    pollBids();
    setInterval(() => {
      pollBids();
    }, 3000);
  }, []);
  // const { isLoading, data } = usePromise(() => getOrderBook(tokenAddress, tokenId), {
  //   resolve: true,
  //   resolveCondition: []
  // });

  const [bids, setBids] = useState(null);
  useEffect(() => {
    if (data && data.orders) {
      const newBids = [];
      data.orders.forEach(order => {
        const bid = {}
        bid.value = Web3.utils.fromWei(order.base_price, 'ether');
        bid.user = (order.maker.user && order.maker.user.username) ? order.maker.user.username : 'Anonymous';
        newBids.push(bid);
      })
      setBids(newBids);
    }
  }, [data])

  console.log(bids);

  async function connectWallet() {
    if (window.ethereum) {
      provider = window.web3.currentProvider;
      seaport = new OpenSeaPort(provider, {
        networkName: Network.Main
      })

      // const tokenAddress = data.external_url.split('/')[4];
      // const tokenId = data.external_url.split('/')[5];

      const accountAddress = '0x7341158387c33247d7aFff2E06D1ae8f5D114C85';

      console.log(props.asset);

      const offer = await seaport.createBuyOrder({
        asset: {
          tokenId,
          tokenAddress
        },
        accountAddress,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: .07,
      })
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
    <div className='margin-top'>
      <div className='text-mid'>
        <strong>Market</strong>
      </div>
      <div className='text-s margin-top-s'>
        <strong>Owner:</strong> { (asset && ((asset.owner.user && asset.owner.user.username) ? asset.owner.user.username : asset.owner.address)) }
      </div>
      <div className='text-s margin-top-s'>
        { bids &&
          bids.map((bid, index)=>{
            return (
              <div className='margin-top-s' key={ index }>
                Bid of { bid.value }Ξ<br />
                <span className='text-xs'>{ bid.user }</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const getOrderBook = (contract, id) => {
  return fetch(`https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&include_invalid=false&limit=20&offset=0&order_by=created_date&order_direction=desc&asset_contract_address=${ contract }&token_ids=${ id }`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}