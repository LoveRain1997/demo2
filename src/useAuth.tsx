import {useCallback} from 'react'
import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core'
import {InjectedConnector} from "@web3-react/injected-connector";
import {EnableChainId, setupNetwork} from "./wallet";

const useAuth = () => {
    const {chainId, activate, deactivate, setError} = useWeb3React()
    const login = useCallback(
        async () => {

            const isMetamask = window.ethereum && window.ethereum.isMetaMask

            if (!isMetamask) {
                window.open('https://metamask.io/download')
                return
            }

            const injectedConnector = new InjectedConnector({supportedChainIds: [EnableChainId]})

            activate(injectedConnector, async (error: Error) => {

                if (error instanceof UnsupportedChainIdError) {
                    setError(error)
                    const provider = await injectedConnector.getProvider()
                    const hasSetup = await setupNetwork(provider)
                    if (hasSetup) {
                        activate(injectedConnector)
                    }
                }
            })
        },
        [activate, setError]
    )

    return {login}
}

export default useAuth
