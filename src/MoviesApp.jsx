 import React from "react";
import { MoviesContext } from "./context/MoviesContext"; 

 import { useFetch } from "./hooks/useFetch";

import { PageMain } from "./components/page-containers/PageMain";

 import "./styles/moviesapp.scss";

const API_URL =
  `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=079a88c8815119a047f6e1f7bff2a647`;

export const MoviesApp = () => {
  const {state:movies, setState:setMovies} = useFetch(API_URL);
  return (
    <>
      <MoviesContext.Provider 
        value={[movies, setMovies]}
      >
          <PageMain/>
      </MoviesContext.Provider>
    </>
  );
};
