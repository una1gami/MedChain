// Navigation.js
import careFinderLogo from "./careFinderLogo.png";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useState } from "react";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import "./Navigation.css";

function Navigation() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Coinbase Wallet configuration
  const APP_NAME = 'CareFinder';
  const APP_LOGO_URL = careFinderLogo;
  const ETH_JSONRPC_URL = 'https://base-mainnet.infura.io/v3/e6a7b986538a4fe3a15a308166bda32b'; // Replace with your Infura or other RPC URL
  const CHAIN_ID = 1; // Ethereum mainnet

  // Initialize Coinbase Wallet SDK
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
  });

  // Wallet provider
  const ethereum = coinbaseWallet.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);

  // Connect Wallet Handler
  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletConnected(true);
      setWalletAddress(account);
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  // Toggle hamburger menu
  const handleHamburgerToggle = () => {
    setHamburgerIsOpen(!hamburgerIsOpen);
  };

  return (
    <div className="navBar">
      <div className="navbar-carefinder-logo">
        <img src={careFinderLogo} alt="CareFinder Logo" />
      </div>
      <div className={`nav-list-wrapper ${hamburgerIsOpen ? "nav-listA" : ""}`}>
        <ul className="nav-list">
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "#fff" }
              }
              className="navigate"
              to="/resources"
            >
             
             
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "#fff" }
              }
              className="navigate"
              to="/about"
            >
              
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "#fff" }
              }
              className="navigate"
              to="/contact"
            >
              
            </NavLink>
          </li>
          <button className=""></button>
          <li>
            <button
              onClick={connectWallet}
              className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {walletConnected ? (
                <span>Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </li>
        </ul>
      </div>
      <div
        className="hamburger"
        onClick={handleHamburgerToggle}
        aria-label="Toggle Menu"
      >
        <Hamburger toggled={hamburgerIsOpen} toggle={setHamburgerIsOpen} />
      </div>
    </div>
  );
}

export default Navigation;
