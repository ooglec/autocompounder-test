import React from "react";
import { Contract } from '@ethersproject/contracts'
import stakeAbi from '../abis/stakeAbi.json'
import factoryAbi from '../abis/factory.json'
import { ethers, utils } from 'ethers'
import { ERC20Interface } from '@usedapp/core'
import routerAbi from '../abis/router.json'

const IStake = new utils.Interface(stakeAbi)
const IFactory = new utils.Interface(factoryAbi)

export const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc')

export const address = "0xBd470638c8Eb9f2FbE763575f02bDd9181403256"
export const Token = '0x51318B7D00db7ACc4026C88c3952B66278B6A67F'
export const router = "0x10953Dd51140396c8c2A2EEF81C19349C65eb28c"
export const factory = '0x762C2b5165E57A9B7B843F5B968C11Fe1d2F55Dd'

// 0xa19557634e8fE32A35F701864b70E841461919CE
export const NATIVE_TK_SYMBOL = 'Pls'
export const TOKEN_SYMBOL = 'Pls'
export const StakeContract = new Contract(address, IStake)
export const Erc20 = new Contract(Token, ERC20Interface)

export const RouterContract = new Contract(router, routerAbi)




export const FactoryContract = new Contract(factory, IFactory)

// npx hardhat verify 0x416abC82b7c8ccB0e124c5CC546818405E64cbBC 0xDbaa56A40b6198dBB0F3Da160cF884A6b2b6c56F --network fuji