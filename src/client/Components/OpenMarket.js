import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import { OpenSeaPort, Network, EventType } from 'opensea-js';
import Web3 from 'web3';

import '../styles.scss';

let provider, seaport;

export default function OpenMarket(props) {
  const auth = useStoreState(state => state.user.auth);
  
  const asset = props.asset;
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

  const [bid, setBid] = useState(0);
  const [unverified, setUnverified] = useState(false);
  const [bidErr, setBidErr] = useState(null);
  const placeBid = async () => {
    setUnverified(false);
    connectWallet();
    if (provider && provider.selectedAddress) {
      console.log(auth.wallet, provider.selectedAddress);
      if (auth.wallet.toLowerCase() !== provider.selectedAddress.toLowerCase()) setUnverified(true);
      else if (bid <= 0) setBidErr('Your bid must be greater than 0 WETH');
      else {
        setBidErr(false);
        await seaport.createBuyOrder({
          asset: {
            tokenId,
            tokenAddress
          },
          accountAddress: provider.selectedAddress,
          // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
          startAmount: bid,
        })
      }
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      provider = window.web3.currentProvider;
      if (!provider.selectedAddress) window.ethereum.enable();
      else {
        seaport = new OpenSeaPort(provider, {
          networkName: Network.Main
        })
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      console.log('uhhh', provider);
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          connectWallet();
        })
      }
    }, 1000)
  }, []);

  const isOwner = (asset && asset.owner && provider !== undefined && asset.owner.address.toLowerCase() !== provider.selectedAddress.toLowerCase());
  if (provider) console.log(isOwner, asset.owner.address.toLowerCase(), provider.selectedAddress.toLowerCase());

  return (
    <div className='margin-top'>
      <div className='text-mid'>
        <strong>Market</strong>
      </div>
      <div className='text-s margin-top-s'>
        <strong>Owner:</strong> { (asset && ((asset.owner.user && asset.owner.user.username) ? asset.owner.user.username : asset.owner.address)) }
      </div>
      { !isOwner &&
        <div className='flex'>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Bid Amount' name='amount' id='amount' required maxLength='100' onChange={e => setBid(e.target.value) } />
            <label className='form__label_s'>Bid Amount (WETH)</label>
          </div>
          &nbsp;<input type='submit' value='Place Bid' className='small-button' onClick={ placeBid } />
        </div>
      }
      { unverified && <Link to='/account' className='text-grey margin-top-s'>Verify your wallet to place a bid</Link> }
      { bidErr && 
        <div className='text-err margin-top-s'>
          { bidErr }
        </div>
      }
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