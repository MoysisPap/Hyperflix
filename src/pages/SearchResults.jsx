import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiConfig from '../data/apiConfig';
import defaultMovie from '../assets/movie-nf.png';
import { FiInfo } from "react-icons/fi";
import Skeleton from '../components/ui-components/Skeleton';


const SearchResults = () => {
  const navigate = useNavigate();

  const navigateToMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }
  const { query } = useParams();
  const [resultsQuery, setResultsQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let data = await apiConfig.getSearchMovie(query);
        setResultsQuery(data.results)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false)
    }
    };

    fetchSearchResults();
  }, [query]);

  const handleResultClick = (movieId) => {
    navigateToMovie(movieId);
    // Clear the search query when navigating to a movie
    // You might want to clear it after a delay to ensure it's cleared after navigation
    setTimeout(() => setResultsQuery([]), 100);
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };

  if (loading) {
    return (
      <div className='pt-[120px]'>
        <h2 className='p-4'>Search Results</h2>
        <div className='px-8'>
          <ul className='flex flex-wrap gap-4'>
            {[...Array(15)].map((_, index) => (
              <li className='p-3 hover:bg-m_darkGrey cursor-pointer' key={index}>
                <div className='w-[80vw] sm:w-[40vw] md:w-[16vw] lg:w-[16vw] h-[220px] inline-block overflow-hidden'>
                  <Skeleton className='w-[600px] h-64 rounded-md' />
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm'>
                    <Skeleton className='w-[100px] h-4 my-2' />
                  </p>
                  <Skeleton className='w-[30px] h-4 my-2' />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

    return (
      <div className=' pt-[120px]'>
        <h2 className=' p-4'>Search Results</h2>
        <div className=' px-8'>
          
          <ul className=' flex flex-wrap gap-4'>
            {resultsQuery.map((movie) => (
              <li className=' p-3 hover:bg-m_darkGrey cursor-pointer' key={movie.id}>
                <Link to={{ pathname: `/movie/${movie.id}` }}>
                <div className='w-[80vw] sm:w-[40vw] md:w-[16vw] lg:w-[16vw] h-[220px] inline-block overflow-hidden '>
                  <img className='w-full h-full block object-cover' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultMovie} alt={movie.title} />
                </div>
                <div className=' flex justify-between w-full'>
                  <p className=' text-sm'>{truncateTitle(movie.title, 25)}</p>
                  {/* <FiInfo /> */}
                </div>
                </Link>
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    );
  };
  
  export default SearchResults;


