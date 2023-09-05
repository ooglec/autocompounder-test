import React, { useEffect, useState} from 'react'
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
    const [loading,  setLoading] = useState(false)

    const requestCreateCompounder = async (account) => {
        const vals = {
            sign: '',
            salt: '',
            deadline: ''
        };
    
        try {
            const response = await fetch(`https://serverless-3pin.onrender.com/createCompounder?userAddress=${account}`, {
                method: 'POST',
            });
    
            if (response.ok) {
                const values = await response.json();
                vals.sign = values.signature;
                vals.salt = values.salt;
                vals.deadline = values.deadline;
            } else {
                console.log('Request failed with status:', response.status);
            }
        } catch (err) {
            console.log('Error:', err);
        }
    
        return vals;
    };
    

    const { state: createState, send: create } = useContractFunction(FactoryContract, 'createAutoCompounder', { transactionName: 'create' })

    const createIt = async () => {
        setLoading(true)
        try{
            const values = await requestCreateCompounder(account)
            console.log(values)
            await create(values.sign, values.salt, values.deadline)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (createState.status === 'Success') {
            alert('Success')
            window.location.reload()
        }else if (createState.status === 'Exception') {
            alert('Error', createState.errorMessage)
        }
    }, [createState])
  return (
    <div>
        <h1 className='text-white'>Create Your Compounder</h1>
        {
            !loading ? <button className='my-4' onClick={createIt}>Create</button> :
            <div>
                <div className=''></div>
                <h4 className='text-white'>Creating Compounder</h4>
                {createState.status && createState.status != 'None' && <p className='text-white'>Status: {createState.status}....</p>}
            </div>
        }

    </div>
  )
}

export default Create