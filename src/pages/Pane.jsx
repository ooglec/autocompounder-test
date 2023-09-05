import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Home from './Home2'
import Info from './Info2'
import { useContractFunction, useEthers  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
import {provider} from '../utils'



const Pane = ({autoCompounder}) => {

  const { account } = useEthers()

  const AutoCompounder = new Contract(autoCompounder, ['function toggleAutoExtend()'])

  const {state: autoExtend, send: extend} = useContractFunction(AutoCompounder, 'toggleAutoExtend', {transactionName: 'toggleAutoExtend'})

  const toggle = () => {
    extend()
  }
  
  return (
    <div className='my-5 p-5 box tab-pill' style={{width: "80vw"}}>
    <h4 className=''>Your Autocompounder</h4>
    <p>{autoCompounder}</p>

    <div>
      <button onClick={toggle}>Toggle Auto Extend</button>
    </div>
        <Tabs variant='pills'  defaultActiveKey="first" className='py-3' 
      fill>
        <Tab  tabClassName={'greenTab'} eventKey="first" title="Stake"  >
          <Home autoCompounder={autoCompounder}/>
        </Tab>
        <Tab tabClassName={'greenTab'} eventKey="second" title="Unstake">
          <Info autoCompounder={autoCompounder}/>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Pane