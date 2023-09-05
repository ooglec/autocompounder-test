import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/archive/Home'
import Info from './pages/archive/Info'
import { useEthers, AvalancheTestnet, Arbitrum } from '@usedapp/core'
import { Row, Col } from 'react-bootstrap'
import { address, Token } from './utils'
import Pane from './pages/Pane'
import { RouterContract, provider} from './utils'
import { ethers, utils } from 'ethers'
import Create from './pages/Create'

function App() {

  const [count, setCount] = useState(0)
  const { account, chainId } = useEthers()

  const [compounder, setCompounder] = useState(null)

  const fetchCompounder = async () => {
    const contract = RouterContract.connect(provider)
    const compounder = await contract.getAutocompounder(account)
    console.log(compounder[2])
    setCompounder(compounder[2])
  }
  useEffect(() => {
    if (chainId != Arbitrum) {
      request()
    }
    if (account) {
      fetchCompounder()
    }
    async function request() {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xA4B1' }], // chainId must be in hexadecimal numbers
      });
    }
  }, [, chainId])

  useEffect(() => {
    if (account) {
      fetchCompounder()
    }
  }, [account])

  return (
    <div>
      <header className='d-flex flex-row justify-content-between text-white w-full w-100'>
        <h4 className=''></h4>
        {account && (<p style={{ borderRadius: "5px" }} className='border py-1 px-3'>{account.slice(0, 10)}...{account.slice(20, 30)}</p>)}
      </header>
      <div className="App d-flex flex-column">
        <div>
        {compounder ? (compounder == ethers.constants.AddressZero ? <Create /> :  <Pane autoCompounder={compounder}/> ) : <div className='text-white'><h3>Loading....</h3></div>}
        </div>
      </div>
    </div>
  )
}

export default App
