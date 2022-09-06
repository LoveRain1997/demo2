import React, {useEffect, useState} from 'react';

import { useContext } from 'react';
import { MoviesContext } from '../../context/MoviesContext';


import { MoviesCards } from '../containers/MoviesCards';
import {useActiveWeb3React, useContract} from "../../hook";
import nftabi from "../../api/nftabi.json";
import BigNumber from "bignumber.js";

export const PageMain = () => {
  const [movies] = useContext(MoviesContext);




  return (

    <main>

      {
          movies === "loading" ? 
          (<div className="loader"></div>) : (<MoviesCards/>)
      }

    </main>
  )
}
