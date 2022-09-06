import React from 'react';
import ReactDOM from 'react-dom/client';
 import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import getLibrary from "./getLibrary";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";



import { MoviesApp } from "./MoviesApp";

import {MovieDetails} from "./components/MovieDetails";
import { useTheme } from "./utils/useTheme";
import ThemeBtn from "./components/ThemeBtn";
import useAuth from "./useAuth";
import {useActiveWeb3React} from "./hook";

export const NetworkContextName = 'NETWORK'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const App = function () {
    const theme = useTheme();

    const {login} = useAuth()
    const {account} = useActiveWeb3React()


    return <BrowserRouter>
        <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:'flex-end'
        }}>
            <ThemeBtn />
            <button
                onClick={() => {
                    login()
                }}
            >{account ? account : 'Connect Wallet'}</button>
        </div>
        <Routes>
            <Route path="/" element={<MoviesApp/>}/>
            <Route path="/details/:id/" element={<MovieDetails/>}/>
        </Routes>
    </BrowserRouter>;
}
root.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <App />
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    </React.StrictMode>
);

