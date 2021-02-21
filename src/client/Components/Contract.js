// import { getFips } from 'crypto';
// import { ethers, Contract } from 'ethers';
// import React, { useEffect, useState } from 'react';
// import { apiUrl } from '../baseUrl';
// const { web3 } = window

// import '../styles.scss';

// let signedContract;

// const setContract = async () => {
//   // Our current contract factory version
//   const version = 'v1.0.0'
//   const abiData = await fetch(`https://us-central1-thing-1d2be.cloudfunctions.net/getAbi?version=${version}`)

//   const { abi } = await abiData.json()

//   // The Mintbase market you want to interact with
//   const address = `0x3f4200234e26d2dfbc55fcfd9390bc128d5e2cca`;
//   const contract = new Contract(address, abi, provider)
  
//   // Only need this if you need to change the state of the contract
//   signedContract = contract.connect(signer)
  
//   // Now take a look at all the functions you get by looking into the log 
//   console.log('Mintbase contract:', signedContract)
// }

// let provider, signer;

// export default function Curation() {
//   const [connected, setConnected] = useState(false);
//   const [address, setAddress] = useState(null);

//   function connectWallet() {
//     if (window.ethereum) {
//       console.log('testing');
//       window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
//       signer = provider.getSigner();
//       signer.getAddress().then(add => { setAddress(add); setConnected(true) });
//       setContract()
//     }
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       if (window.ethereum) {
//         window.ethereum.on('accountsChanged', function (accounts) {
//           connectWallet();
//         })
//       }

//       connectWallet();
//     }, 1000)
//   }, []);

//   return (
//     <div className='content-block'>
//       <div className='text-l text-b'>
//         Committee Curation
//       </div>
//       <div className='text-s margin-top-s'>
//         Let's move people forward.
//       </div>
//       <div className='margin-top'>
//         { connected ?
//           <div className='text-s'>
//             { address }<br />
//             <span className='text-s margin-top-s text-grey pointer' onClick={ () => setConnected(false) }>Disconnect Wallet</span><br />
//           </div>
//         :
//           <div className='text-s'>
//             <span className='text-s margin-top-s text-grey pointer' onClick={ () => connectWallet() }>Connect Wallet</span>
//           </div>
//         }
//       </div>
//     </div>
//   );
// }