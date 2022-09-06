import React, {useContext, useState} from "react";
import {useParams} from "react-router-dom";
import {useFetch} from "../hooks/useFetch";
import {useActiveWeb3React, useContract, useContractSigner} from "../hook";
import nftabi from "../api/nftabi.json";
import BigNumber from "bignumber.js";

import {create, urlSource} from 'ipfs-http-client';
const client = create('http://127.0.0.1:5002/api/v0')


 export const MovieDetails = () => {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const params = useParams();

   const API_URL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=079a88c8815119a047f6e1f7bff2a647&language=en-US`;

   const {state:detail, setState:setDetail} = useFetch(API_URL);
  const { library, account } = useActiveWeb3React()


  const [loading, setLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')

  const NFTContract = useContractSigner('0x8318CC68e7eA1731B9D7dB4AFFe0941D869B037a',nftabi)

  async function asyncUploadCall() {
    setLoading(true)
   try {


    /*const response = await fetch(API_IMG + detail?.poster_path,{
     method: 'GET',
     mode: 'no-cors',
    });
    const blob = await response.blob();

    const file = new File([blob], 'image.jpg', {type: blob.type});
    const added = await client.add(file)
    console.log(added.path)*/
    const tx = await  NFTContract.mint(params.id,detail?.title,'XXXXX')
    const { transactionHash }= await tx.wait()
    setTransactionHash(transactionHash)
   }finally {
    setLoading(false)
   }

  }


  return (
     <div className="movie-details">

         {
             detail === "loading" ?
                 (<div className="loader">loading</div>) : (
                     <div className="details-card">
                     {
                         detail?.poster_path
                             ?
                             <img src={API_IMG + detail?.poster_path} alt="movie-poster" />
                             :
                             <div className="movie-poster-unavailable">
                                 <h4>
                                     {detail?.title}
                                     <br />
                                     <span>(Poster unavailable)</span>
                                 </h4>
                             </div>
                     }
                     <article  className="details-article">
                         <h1>{detail?.title}</h1>
                         <h2>Overview</h2>
                         <p>{detail?.overview}</p>
                         <h3>imdB: {detail?.vote_average}</h3>
                         <h3>Release date: {detail?.release_date}</h3>
                         <button style={{width:200,height:50}} disabled={!account||loading} onClick={()=>asyncUploadCall()}>{!loading?account?'mint':'Connect Wallet':'loading'}</button>
                          <h2>mint result:{transactionHash}</h2>
                     </article>
                 </div>)
         }

    </div>
  );
};
