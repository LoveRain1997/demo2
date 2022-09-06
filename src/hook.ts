import {useMemo} from "react";
import {Web3ReactContextInterface} from "@web3-react/core/dist/types";
import {Web3Provider} from "@ethersproject/providers";
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import {EnableChainId, NETWORK_CONFIG} from "./wallet";
import {multicallAbi} from "./api/multicall";
import { BigNumber } from '@ethersproject/bignumber'
import {NetworkContextName} from "./index";
import { JsonRpcProvider } from '@ethersproject/providers'

import ERC20_ABI from './api/erc20.json'


const multicallAddresses = {
    4: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
};

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: number } {
    const context = useWeb3ReactCore<Web3Provider>()
    const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
    return context.active ? context : contextNetwork
}



export function useContract(address: string  , ABI: any): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        try {
            return new Contract(address, ABI,new JsonRpcProvider(NETWORK_CONFIG[EnableChainId].rpcURL))
        } catch (error) {
            return null
        }
    }, [address, ABI, library, account])
}

export function useContractSigner(address: string  , ABI: any): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        try {
            return new Contract(address, ABI,library?.getSigner())
        } catch (error) {
            return null
        }
    }, [address, ABI, library, account])
}



export function useTokenContract(tokenAddress: string) {
    return useContract(tokenAddress, ERC20_ABI)
}

export function useMulticallContract(): Contract | null {
    return useContract( multicallAddresses[EnableChainId], multicallAbi,)
}





