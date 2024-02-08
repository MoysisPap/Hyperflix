import React, { createContext } from 'react'
import { apiUrl, apiKey } from "../data/apiData";

export const MovieContext = createContext(null);

const MovieContextProvider = (props) => {

    // const slideLeft = (sliderId) => {
    //     setSliderPosition((prevPosition) => prevPosition - 500);
    //   };
    
    //   const slideRight = (sliderId) => {
    //     setSliderPosition((prevPosition) => prevPosition + 500);
    //   };

    

    const slideLeft = (sliderId) => {
        let slider = document.getElementById(sliderId);
        slider.scrollLeft = Math.max(slider.scrollLeft - 500);
    }

    const slideRight = (sliderId) => {
        let slider = document.getElementById(sliderId);
        slider.scrollLeft = Math.max(slider.scrollLeft + 500);
    }

     // format duration to 0h 0m format
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (tmdbDate) => {
    const dateObject = new Date(tmdbDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    const year = dateObject.getFullYear();
  
    return `${day}/${month}/${year}`;
  };


    const contextValue = {slideLeft, slideRight, formatRuntime, formatDate};
  return (
    <MovieContext.Provider value={contextValue}>
        {props.children}
        </MovieContext.Provider>
  )
}

export default MovieContextProvider