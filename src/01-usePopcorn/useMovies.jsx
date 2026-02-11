import { useState, useEffect } from "react" ;

const KEY = "9c6a2e51";

// custom hook: useMovies with named export 
export function useMovies(query, callback){ // callback(handleCloseMovie) is optional

  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();  // call handleCloseMovie only if it's passed as a callback (optional)

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          // loading state (for the time data is still being loaded)
          setIsLoading(true);

          const res = await fetch(
            // `https://www.omdbapi.com/?i=${KEY}&s=${query}`,
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, {signal: controller.signal});
          // error handeling (error while loading data, i.e. user offline)

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found : ");

          setMovies(data.Search);

        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false); // loading state
          setError("");
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return () => controller.abort();
    },
    [query],
  );

  return {movies, isLoading, error};
}