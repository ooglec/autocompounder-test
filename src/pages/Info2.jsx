import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { StakeContract, address, NATIVE_TK_SYMBOL, TOKEN_SYMBOL, RouterContract, EsPlsTracker, LockedContract, sbPlsTracker, RewardTracker, MpPlsTracker, ethersFormat, sumAll} from '../utils'
import { Arbitrum, useCall, useContractFunction, useContractCall, useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import autoCompounderAbi from '../abis/autoCompounder.json'
import { Contract } from 'ethers'

const Info = ({autoCompounder}) => {
    const { account } = useEthers()

    const IAutoCompounder = new utils.Interface(autoCompounderAbi)
    const AutoCompounder = new Contract(autoCompounder, IAutoCompounder)

    // const { state: claimState, send: claim } = useContractFunction(StakeContract, 'withdrawAccumulatedPls', { transactionName: 'claim' })
    const { state: unstakedState, send: unstake } = useContractFunction(RouterContract, 'unStakePls', { transactionName: 'withdraw' })
    const {state: compoundMpPlsState, send: compoundMpPls} = useContractFunction(RouterContract, 'compoundMpPls', {transactionName: 'compoundMpPls'})
    const {state: claimAndStakeEsPlsState, send: claimAndStakeEsPls} = useContractFunction(RouterContract, 'claimAndStakeEsPls', {transactionName: 'claimAndStakeEsPls'})
    const {state: unstakeEsPlsState, send: unstakeEsPls} = useContractFunction(AutoCompounder, 'unStakeEsPls', {transactionName: 'unStakeEsPls'})
   


    const { value: assets, error: err } = useCall({
        contract: RouterContract,
        method: 'getTotalStake',
        args: [account]
    }, { chainId: Arbitrum.chainId }) ?? {}

    const { value: esPlsStaked, error: esErr } = useCall({
        contract: EsPlsTracker,
        method: 'stakedAmounts',
        args: [autoCompounder]
    }, { chainId: Arbitrum.chainId }) ?? {}

    const { value: mpPlsStaked, error: mpErr } = useCall({
        contract: MpPlsTracker,
        method: 'stakedAmounts',
        args: [autoCompounder]
    }, { chainId: Arbitrum.chainId }) ?? {}
    

    const { value: esPlsEarned, error: esEarnErr } = useCall({
        contract: RewardTracker,
        method: 'claimableReward',
        args: [autoCompounder]
    }, { chainId: Arbitrum.chainId }) ?? {}

    const { value: mpPlsEarned, error: mpEarnErr } = useCall({
        contract: sbPlsTracker,
        method: 'claimableReward',
        args: [autoCompounder]
    }, { chainId: Arbitrum.chainId }) ?? {}

    const {value: lockedBalanceOf, error: lockedErr} = useCall({
        contract: LockedContract,
        method: 'lockedBalanceOf',
        args: [autoCompounder]
    }, {chainId: Arbitrum.chainId}) ?? {}

    const valueCheck = (func, value) => {
        if (value > 0){
            func()
        }else{
            alert('value is 0')
        }
    }

    console.log(esPlsEarned)
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
            <Row className='bottom my-2' >
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
                    {lockedBalanceOf ? (lockedBalanceOf[0] > 0 ? <button className='w-100 mt-2'>Locked</button> : <button onClick={() => unstake()}  className='w-100 mt-2'>Unstake</button>) :  <button className='w-100 mt-2'>-</button>}
                </Col>
                <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>Estimated bPls: </span><span className='text-green px-2'>{mpPlsStaked && esPlsStaked && assets && (sumAll([mpPlsStaked[0], esPlsStaked[0], assets[0]]))} bPls</span>
                    </div>
                    <button disabled className='w-100 mt-2'>bPls</button>
                </Col>
            </Row>

            <Row className='my-2'>
                <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>esPls Earned: </span><span className='text-green px-2'>{esPlsEarned ? ethersFormat(esPlsEarned[0]) : ''} esPls</span>
                    </div>
                    {esPlsEarned && <button onClick={() => valueCheck(claimAndStakeEsPls, esPlsEarned[0])}  className='w-100 mt-2'>Compound</button>}
                </Col>
                <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>mpPls Earned: </span><span className='text-green px-2'> {mpPlsEarned ? ethersFormat(mpPlsEarned[0]) : ""} mpPls</span>
                    </div>
                    {mpPlsEarned && <button onClick={() => valueCheck(compoundMpPls, mpPlsEarned[0])} className='w-100 mt-2'>Compound</button>}
                </Col>
            </Row>


            <Row className='my-2'>
                <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>esPls Staked: </span><span className='text-green px-2'>{esPlsStaked && ethersFormat(esPlsStaked[0])} esPls</span>
                    </div>
                    <button onClick={() => unstakeEsPls(esPlsStaked[0], true)}  className='w-100 mt-2'>Unstake</button>
                </Col>
                <Col sm={12} md={6} className='d-flex flex-column mt-2 justify-content-start align-items-start'>
                    <div className='d-flex '>
                        <span>mpPls Staked: </span><span className='text-green px-2'>{mpPlsStaked && ethersFormat(mpPlsStaked[0])}  mpPls</span>
                    </div>
                    <button disabled className='w-100 mt-2'>-</button>
                </Col>
            </Row>
        

        </div>
    )
}

export default Info