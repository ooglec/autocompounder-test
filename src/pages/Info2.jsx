import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { StakeContract, address, NATIVE_TK_SYMBOL, TOKEN_SYMBOL, RouterContract } from '../utils'
import { Arbitrum, useCall, useContractFunction, useContractCall, useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

const Info = () => {
    const { account } = useEthers()
    // const { state: claimState, send: claim } = useContractFunction(StakeContract, 'withdrawAccumulatedPls', { transactionName: 'claim' })
    // const { state: withdrawState, send: withdraw } = useContractFunction(StakeContract, 'unstakePls', { transactionName: 'withdraw' })
   
    const { value: assets, error: err } = useCall({
        contract: RouterContract,
        method: 'getTotalStake',
        args: [account]
    }, { chainId: Arbitrum.chainId }) ?? {}

    


    console.log(assets)
    // const { value, error } = useCall({
    //     contract: StakeContract,
    //     method: 'plsRewardsBalance',
    //     args: [account]
    // }, { chainId: Arbitrum.chainId }) ?? {}

    // console.log(value)

    // const claimIt = () => {
    //     claim()
    // }


    return (
        <div className=' my-5 justify-content-between ' >
            <Row className='bottom' >
                {/* <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>Rewards:</span><span className={!value ? 'text-white px-2' : 'text-green px-2'}> {value ? Math.round(formatEther(value.toString()) * 10000000) / 10000000 : 0} {'Pls'}</span>
                    </div>
                    <button  onClick={claimIt} className='w-100 mt-2'>Claim</button>
                </Col> */}
                <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>Pls Staked:</span><span className={!assets ? 'text-white px-2' : 'text-green px-2'}>{assets ? Math.round(formatEther(assets[0]) * 1000000) / 1000000 : 0} Pls</span>
                    </div>
                    <button  className='w-100 mt-2'>Unstake</button>
                </Col>
            </Row>
        


        </div>
    )
}

export default Info