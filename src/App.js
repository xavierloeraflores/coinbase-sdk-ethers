import React, {useState} from "react"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import { ethers } from "ethers"
const { REACT_APP_INFURA:INFURA } = process.env

const APP_NAME = "Coinbase SDK Ethers Test App"
const APP_LOGO_URL = "https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
const DEFAULT_ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${INFURA}`
const DEFAULT_CHAIN_ID = 1

export const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
})


export const ethereum = coinbaseWallet.makeWeb3Provider(
  DEFAULT_ETH_JSONRPC_URL,
  DEFAULT_CHAIN_ID
)


export const provider = new ethers.providers.Web3Provider(ethereum)

const App = () => {
  const [wallet, setWallet] = useState("")
  const [balance, setBalance] = useState(0.0)

  const connectWallet = async () => {
    const accounts = await ethereum.enable()
    setWallet(accounts[0])
  }

  const disconnectWallet = async () => {
    coinbaseWallet.disconnect()
    setWallet("")
    setBalance(0.0)
  }

  const getBalance = async () => {
    const walletBalance = await provider.getBalance(wallet)
    setBalance(ethers.utils.formatEther(walletBalance))
  }

  return (
    <>
      {!wallet ? (
        <>
          <p>Connect wallet</p>
          <button onClick={() => connectWallet()}>Connect Wallet</button>
        </>
      ) : (
        <>
          <p>Your Wallet: {wallet}</p>
          <p>Your ETH Balance: {balance}</p>
          <button onClick={() => getBalance()}>Show Balance</button>
          <button onClick={() => disconnectWallet()}>Disconnect Wallet</button>
        </>
      )}
    </>
  )
}

export default App
