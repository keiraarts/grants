import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import useInterval from '@use-it/interval';
import { OpenSeaPort, Network } from 'opensea-js';
import OpenSeaLogo from '../assets/opensea.png';
import Web3 from 'web3';

import '../styles.scss';

let provider, seaport;

function openLink(page)
{
  let win = window.open(page, '_blank');
  win.focus();
}

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
  }, [])

  useInterval(() => {
    pollBids();
  }, 3000);

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

  const createAuction = async () => {
    connectWallet();
    if (provider && provider.selectedAddress) {
      console.log(auth.wallet, provider.selectedAddress);
      if (auth.wallet && auth.wallet.toLowerCase() !== provider.selectedAddress.toLowerCase()) setUnverified(true);
      else if (bid <= 0) setBidErr('Your reserve price must be greater than 0 WETH');
      else {
        setBidErr(false);
        await seaport.createSellOrder({
          asset: {
            tokenId,
            tokenAddress
          },
          accountAddress: provider.selectedAddress,
          // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
          englishAuctionReservePrice: bid,
          startAmount: 0,
          paymentTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24),
          waitForHighestBid: true
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
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
          connectWallet();
        })
      }
    }, 1000)
  }, []);

  const isOwner = (asset && asset.owner && auth && auth && asset.owner.address.toLowerCase() === auth.wallet.toLowerCase());
  if (provider) console.log(isOwner, asset.owner.address.toLowerCase(), provider.selectedAddress.toLowerCase());

  console.log('YOYOYO', data, asset);

  let address = (asset && asset.owner && asset.owner.address) ? asset.owner.address : null;
  if (address === '0x47bcd42b8545c23031e9918c3d823be4100d4e87') address = 'Sevens Foundation';

  return (
    <div className='margin-top'>
      <div className='text-mid'>
        <strong>Market</strong>
      </div>
      <div className='text-xs margin-top-s'>
        <strong>Owner:</strong> { (asset && ((asset.owner.user && asset.owner.user.username) ? asset.owner.user.username : address)) }
        <img src={ OpenSeaLogo } className='block-social' alt='OpenSea' onClick={ () => openLink(asset.permalink) } />
      </div>
      { !isOwner ?
        <div className='flex'>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Bid Amount' name='amount' id='amount' required maxLength='100' onChange={e => setBid(e.target.value) } />
            <label className='form__label_s'>Bid Amount (WETH)</label>
          </div>
          &nbsp;<input type='submit' value='Place Bid' className='small-button' onClick={ placeBid } />
        </div>
        :
        <div className='flex'>
          <div className='form__group field'>
            <input type='text' className='form__field' placeholder='Bid Amount' name='amount' id='amount' required maxLength='100' onChange={e => setBid(e.target.value) } />
            <label className='form__label_s'>Reserve Price (WETH)</label>
          </div>
          &nbsp;<input type='submit' value='Create Auction' className='small-button' onClick={ createAuction } />
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