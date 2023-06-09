import React from "react";
import { Contract } from '@ethersproject/contracts'
import stakeAbi from '../abis/stakeAbi.json'
import { ethers, utils } from 'ethers'
import { ERC20Interface } from '@usedapp/core'

const IStake = new utils.Interface(stakeAbi)

export const address = "0xBd470638c8Eb9f2FbE763575f02bDd9181403256"
export const Token = '0x51318B7D00db7ACc4026C88c3952B66278B6A67F'

// 0xa19557634e8fE32A35F701864b70E841461919CE
export const NATIVE_TK_SYMBOL = 'Pls'
export const TOKEN_SYMBOL = 'Pls'
export const StakeContract = new Contract(address, IStake)
export const Erc20 = new Contract(Token, ERC20Interface)


// npx hardhat verify 0x416abC82b7c8ccB0e124c5CC546818405E64cbBC 0xDbaa56A40b6198dBB0F3Da160cF884A6b2b6c56F --network fuji