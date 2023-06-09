import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Home from './Home2'
import Info from './Info2'

const Pane = () => {
  return (
    <div className='my-5 p-5 box tab-pill' style={{width: "80vw"}}>
    <h4 className=''>Autocompounder Test</h4>
        <Tabs variant='pills'  defaultActiveKey="first" className='py-3' 
      fill>
        <Tab tabClassName={'greenTab'} eventKey="first" title="Stake"  >
          <Home/>
        </Tab>
        <Tab tabClassName={'greenTab'} eventKey="second" title="Unstake">
          <Info/>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Pane