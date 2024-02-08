
import { useState, useContext } from 'react';
import { MovieContext } from '../../../context/MovieContextProvider';
import { Link, useNavigate } from "react-router-dom";
import BtnDetails from "../../ui-components/BtnDetails";
//import {FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import Skeleton from '../../ui-components/Skeleton';
import { FiInfo } from 'react-icons/fi';

const Movies = ({title, items}) => {
  const {slideLeft, slideRight} = useContext(MovieContext); 
  
  const [sliderId] = useState(`slider-${Math.random().toString(36).substring(7)}`);

  //console.log(items)
  const navigate = useNavigate();

  const navigateToMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };


  return(

    <div className=' px-8'>
      <h2 className="p-4 mt-10">{title}</h2>
      <div className=" relative flex items-center group">
        <IoIosArrowDropleftCircle onClick={() => { slideLeft(sliderId)}} className=' absolute left-0 text-m_white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
        <div id={sliderId} className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
        {items.results.length > 0 ? (
            items.results.map((item, key) => (
              <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-3 hover:bg-m_darkGrey cursor-pointer" key={key}>
                <Link to={{ pathname: `/movie/${item.id}` }}>
                <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`} alt={item.original_title} />
                {/* <div className="absolute top-0 left-0 w-full h-full hover:bg-m_black/80 opacity-0 hover:opacity-100 text-m_white"> */}
                  <div className='flex justify-between items-center p-2'>
                  
                  <p className=' text-sm'>{truncateTitle(item.title || item.name, 25)}</p>
                  {/* <FiInfo /> */}
                
                    {/* <p className="text-m_white whitespace-normal font-open_sans text-sm md:text-md font-bold ">{item.title || item.name}</p>
                    <BtnDetails onClick={() => { navigateToMovie(item.id) }} /> */}
                  </div>
                {/* </div> */}
              </Link>
              </div>
            ))
          ) : (
            // Use Skeleton component when items are loading
            Array.from({ length: 5 }).map((_, key) => (
              <Skeleton key={key} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-[200px] p-2" />
            ))
          )}
        </div>
        <IoIosArrowDroprightCircle onClick={() => { slideRight(sliderId)}} className=' absolute right-0 text-m_white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />

      </div>
    </div>
  )
}

export default Movies;