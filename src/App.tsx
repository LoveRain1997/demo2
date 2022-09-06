import React, {useEffect, useState} from 'react';
import useAuth from "./useAuth";
import {useActiveWeb3React, useContract, useMulticallContract, useTokenContract} from "./hook";
// @ts-ignore
import BigNumber from 'bignumber.js'

import nftabi from './api/nftabi.json'

function App() {
    const {login} = useAuth()
    const {account} = useActiveWeb3React()

    const NFTContract = useContract('0x8318CC68e7eA1731B9D7dB4AFFe0941D869B037a',nftabi)

    const [tokens, setTokens] = useState<number[]>([0, 0])
    useEffect(() => {
        if (  account) {
            ;(async () => {
                    const [  nftBalance] = await Promise.all([
                        NFTContract?.balanceOf(account)
                    ])
                    setTokens([ new BigNumber(nftBalance._hex).div(Math.pow(18, 18)).toNumber()])
                }
            )()
        }
    }, [ account])

    return (
        <div>
            <header>
                <button
                    onClick={() => {
                        login()
                    }}
                >{account ? account : 'Connect Wallet'}</button>
                <p>
                    <span>native token balance:{tokens[0]}</span>
                </p>
            </header>
        </div>
    );
}

export default App;
