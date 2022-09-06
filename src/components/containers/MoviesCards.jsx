import React, {useContext, useEffect, useState} from "react";
import { MoviesContext } from "../../context/MoviesContext";

import { MovieCard } from "../MovieCard";
import {useActiveWeb3React, useContract} from "../../hook";
import nftabi from "../../api/nftabi.json";
import BigNumber from "bignumber.js";

export const MoviesCards = () => {
  const [movies] = useContext(MoviesContext);


    const {account} = useActiveWeb3React()

    const NFTContract = useContract('0x8318CC68e7eA1731B9D7dB4AFFe0941D869B037a',nftabi)

    const [moveIds, setMoveIds] = useState([])
    useEffect(() => {
        if (  account) {
            ;(async () => {
                    const [  nftList] = await Promise.all([
                        NFTContract?.getNFTList()
                    ])
                    console.log(nftList)
                    if(Array.isArray(nftList)){
                        setMoveIds(nftList.map((item)=> new BigNumber(item.movie_id._hex).toNumber() ))
                    }
                }
            )()
        }
    }, [ account])


  return (

       <section className="card-container">
         {
           movies.length > 0 ?
               (
                   movies.map((movieReq) => (
                       <div key={movieReq.id} >
                           <MovieCard key={movieReq.id} {...{...movieReq,isMinted:moveIds.find((item)=>item===Number(movieReq.id))}} />
                       </div>
                   ))
               )
               :
               (<h1>No movies found</h1>)
         }
       </section>

  );
};
