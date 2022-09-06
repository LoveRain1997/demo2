import { useEffect, useState } from "react";

export const useFetch = (url:string) => {
  const [state, setState] = useState('loading');

  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => setState(data.results||data));
  }, [url]);

  return {state, setState};
};
