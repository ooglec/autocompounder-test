import React, { useEffect} from 'react'
import { FactoryContract } from '../utils'
import { useContractFunction, useEthers } from '@usedapp/core'
//
// make a request for a signature from lambda
// get the deadline from the lambda
// generate a salt from nonce and signer address
// call predict deterministic on the factory contract with salt
// send vals to function to create compounder
// load compounder address each time user connects wallet


//storing the private key as an env


const Create = () => {
    const { account } = useEthers()

    const requestCreateCompounder = async () => {
        //send a request to lambda to get the signature, salt, and deadline
        //send the account as a param
        
    }

    const { state: createState, send: create } = useContractFunction(FactoryContract, 'createAutoCompounder', { transactionName: 'create' })

    const createIt = (sign, salt, deadline) => {
        create(sign,salt, deadline)
    }

    useEffect(() => {
        if (createState.status === 'Success') {
            alert('Success')
        }else if (createState.status === 'Exception') {
            alert('Error', createState.errorMessage)
        }
    }, [createState])
  return (
    <div>
        <button onClick={requestCreateCompounder}>Create</button>
    </div>
  )
}

export default Create