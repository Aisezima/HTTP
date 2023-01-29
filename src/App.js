import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { BASE_URL } from './utils/constands';

function App() {
  const  [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

 

  const  fetchMoviesHandler = useCallback(
    async() => { 
      setIsLoading(true)
      try {
        const response =  await  fetch(`${BASE_URL}/films`)
  
        if(!response.ok) {
          throw new Error('Something went wrong')
         }
        const data = await response.json()
        const transformedMovieData = data.result.map((movieData) => {
          return {
              id: movieData.properties.episode_id,
              title: movieData.properties.title,
              releaseData: movieData.properties.release_data,
              openingText: movieData.properties.opening_crawl,
          };
        });
        
  
        setFilms(transformedMovieData)
      }catch(err) {
        setError(err.message);
      }
      setIsLoading(false)
    }, [] )
  
    useEffect (() => {
      fetchMoviesHandler()
    }, [fetchMoviesHandler])
  

    
  
  let content = <p> No movies Found</p>

  if(isLoading) {
    content = <p> Loading...</p>
  } 

  if(films.length > 0) {
    content = <MoviesList movies={films}/>
  }
  
  if(error) {
    content = <p>{error}</p>
  }

  //1 variant
  // бул   fetch arkyluu setevoi zapros kyldyk
  // function fetchMoviesHandler() {
  //   fetch(`${BASE_URL}/films`)
  //   .then((response) => response.json())
  //   .then((data) => {
      // const transformedMovieData = data.result.map((movieData) => {
      //   return {
      //       id: movieData.properties.episode_id,
      //       title: movieData.properties.title,
      //       releaseData: movieData.properties.release_data,
      //       openingText: movieData.properties.opening_crawl,
      //   }
      // })
  //     setFilms(transformedMovieData)
  //   })
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section> {content}
      {/* {error &&  <p>{error} </p>} (bul 1chi jolu  birok bul jolu graznyi kod bolot p oetomy conditional renderingdi koldonduk)
      {isLoading && <p>loading... </p>}  
      <MoviesList movies={films}/> 
       */}
      
       </section>
    </React.Fragment>
  );
}

export default App;

