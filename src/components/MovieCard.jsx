 import React, {useContext, useEffect, useState} from "react";
import { MoviesContext } from "../context/MoviesContext";
import { useNavigate } from "react-router-dom";


 export const MovieCard = ( {
                            id,
                            title,
                            poster_path,
                            isMinted
                          }) => {
     const API_IMG = "https://image.tmdb.org/t/p/w500";

     let navigate = useNavigate();


    // const NFTContract = useContract('0x8318CC68e7eA1731B9D7dB4AFFe0941D869B037a',nftabi)

   //  const [tokens, setTokens] = useState<number[]>([0, 0])


/*
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
*/



     return (
       <article className="movie-card">
           {
               isMinted? <p>minted</p>:''
           }
        {
          poster_path
              ?
              <div>
                  <img src={API_IMG + poster_path} alt="movie-poster" />
                  <h4>
                      {title}
                  </h4>

              </div>
              :
              <div className="movie-poster-unavailable">
                <h4>
                  {title}
                  <br />
                  <span>(Poster unavailable)</span>
                </h4>
              </div>
        }

             <button onClick={() => navigate(`/details/${id}`)}></button>


       </article>
  );
};
