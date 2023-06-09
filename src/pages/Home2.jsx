import React from 'react'
import { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import { useEtherBalance, useEthers, useTokenBalance, useTokenAllowance, useContractFunction } from '@usedapp/core'
import { address, Erc20, StakeContract, Token, NATIVE_TK_SYMBOL, TOKEN_SYMBOL } from '../utils'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import { ethers } from 'ethers'
const Home = () => {
    const [value, setValue] = useState("0")
    const [error, setError] = useState("")
    const { account, activateBrowserWallet } = useEthers()
    const plsBalance = useTokenBalance("0x51318B7D00db7ACc4026C88c3952B66278B6A67F", account)
    const allowance = useTokenAllowance("0x51318B7D00db7ACc4026C88c3952B66278B6A67F", account, address)

    const { state: stakeState, send: stake } = useContractFunction(StakeContract, 'stakePls', { transactionName: 'stakePls' })
    const { state: approveState, send: approve } = useContractFunction(Erc20, 'approve', { transactionName: 'approve' })

    const handleChange = (e) => {
        setValue(e.target.value)
        if (parseInt(e.target.value) == 0) {
            setError("Value must greater than 0")
        } else if (parseFloat(value) < parseFloat(ethers.utils.formatEther(plsBalance).toString())){
            setError("Error: More than Pls Balance")
            return 
        }
        else {
            setError("")
        }
    }

    const sign = () => {
        try {
            activateBrowserWallet()
        } catch (error) {
            console.log('err')
            activate()
        }
    }

    const approveIt = () => {
        approve(address, ethers.constants.MaxUint256)
    }

    const stakeIt = () => {
        if (parseInt(value) <= 0) {
            alert('Greater than 0')
            return
        }
        if (parseFloat(value) < parseFloat(ethers.utils.formatEther(plsBalance).toString())){
            setError("More than Pls Balance")
            return 
        }
        stake(ethers.utils.parseEther(value.toString()))
    }

    //
    return (
        <div className='py-5  d-flex flex-column align-items-start'>
            <input value={value} onChange={(e) => handleChange(e)} className='my-2 form-control' placeholder="PLS" />
            <p className='align-items-start'>Balance: {plsBalance ? formatEther(plsBalance) : 0} {"PLS"}</p>
            {!account ? <button onClick={sign()} className='my-2 w-100'>Connect</button> : plsBalance && (plsBalance > 0 && allowance > parseInt(value) ? <button onClick={() => stakeIt()} className='my-2 w-100'>Stake</button> : <button onClick={approveIt} className='my-2 w-100'>Approve</button>)}
            <p className='text-red'>{error}</p>
        </div>
    )
}

export default Home