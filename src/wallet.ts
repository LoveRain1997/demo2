// Set of helper functions to facilitate wallet setup

import { ExternalProvider } from '@ethersproject/providers'

export  const EnableChainId = 4
export const NETWORK_CONFIG = {
  [4]: {
    name: 'rinkeby',
    scanURL: 'https://rinkeby.etherscan.io/',
    rpcURL:'https://rpc.ankr.com/eth_rinkeby'
  },
}

export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum
  if (provider) {
    try {
      // @ts-ignore
      await provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${EnableChainId.toString(16)}` }]
      })

      return true
    } catch (switchError) {
      if ((switchError as any)?.code === 4902) {
        try {
          // @ts-ignore
          await provider?.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                // @ts-ignore
                chainId: `0x${EnableChainId.toString(16)}`,
                chainName: NETWORK_CONFIG[EnableChainId].name,
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: [NETWORK_CONFIG[EnableChainId].rpcURL],
                blockExplorerUrls: [`${NETWORK_CONFIG[EnableChainId].scanURL}/`]
              }
            ]
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
          return false
        }
      }
      return false
    }
  } else {
    console.error('Can\'t setup the cube network on metamask because window.ethereum is undefined')
    return false
  }
}


