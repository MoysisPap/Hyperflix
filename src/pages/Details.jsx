import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContextProvider';
import apiConfig from '../data/apiConfig';
import { TbPointFilled } from "react-icons/tb";
import { FaGlobe, FaImdb } from "react-icons/fa";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import Trailer from '../components/ui-components/Trailer';
import Cast from '../components/pages-components/details/Cast';
import Reviews from '../components/pages-components/details/Reviews';


export default function Details() {
  let { id } = useParams();
  const {formatRuntime, formatDate} = useContext(MovieContext); 
  // const {slideLeft, slideRight, formatRuntime, formatDate} = useContext(MovieContext); 
  const [movieDetails, setMovieDetails] = useState({});

  
  const [castSliderId] = useState(`slider-${Math.random().toString(36).substring(7)}`);
  const [crewSliderId] = useState(`slider-${Math.random().toString(36).substring(7)}`);

  const slideLeft = (sliderId) => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = Math.max(slider.scrollLeft - 500);
  }

  const slideRight = (sliderId) => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = Math.max(slider.scrollLeft + 500);
  }

  useEffect(() => {
    const loadDetails = async () => {

      let movie = await apiConfig.getMovieForId(id);
      setMovieDetails(movie)
      console.log(movie)

    }
    loadDetails();
  }, [id])

  

  let releaseYear = new Date(movieDetails.release_date);

  const formatMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // const getLanguageName = (code) => {
  //   const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  //   return languageNames.of(code);
  // };

  const getL = (c) => new Intl.DisplayNames(['en'], {type: 'language'}).of(c);

  let genres = [];
    for(let i in movieDetails.genres) {
      genres.push(movieDetails.genres[i].name);
    }


  //crew information
  let productionName = [];
  for(let i in movieDetails?.credits?.crew){
    productionName.push( movieDetails.credits.crew[i].name);
  }


const crewMap = {};

for (let i in movieDetails?.credits?.crew) {
  const crewMember = movieDetails.credits.crew[i];
  const name = crewMember.name;
  const title = crewMember.job;
  const image = crewMember.profile_path;

  if (!crewMap[name]) {
    crewMap[name] = [{ title, image }];
  } else {
    crewMap[name].push({ title, image });
  }
  // console.log(image)
}

// Create an array of objects with name, titles, and image
const crewInfoArray = Object.entries(crewMap).map(([name, roles]) => ({
  name,
  titles: roles.map(role => role.title).join(', '),
  image: roles[0].image, // Assuming the crew member has the same image for all roles
}));

  return (

    <div>
      <div>
        <div className=" flex items-end bg-gray-800 text-white h-[90vh]" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path || movieDetails.poster_path})`, backgroundSize: 'cover'}}>
          <div className='w-full h-full flex flex-col md:flex-row justify-end md:items-end p-5 sm:p-10 gap-5 bg-m_black/80'>
            <div className='w-[30%] md:w-[300px] h-auto'><img className=' block w-full h-full object-cover' src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title}/></div>
              <div className=' flex flex-col sm:flex-row items-end gap-4 w-full sm:w-[80%] justify-between'>
                <div className='w-full sm:w-[55%]'>
                  <h1>{movieDetails.title}<span className=' font-thin'> ({releaseYear.getFullYear()})</span></h1>
                  <p className=' flex flex-wrap items-center gap-1 text-sm mb-3 mt-1 italic'>{`${formatDate(movieDetails.release_date)}`} <TbPointFilled /> {genres.join(', ')} <TbPointFilled /> {` ${formatRuntime(movieDetails.runtime)}`}</p>
                
                  {/* <div> popularity: {movieDetails.popularity}</div> */}
                  <div className=' my-4'>
                    <h3 className=' text-xl font-bold'>Overview</h3>
                    <p className=' text-sm sm:text-md'>{movieDetails.overview}</p>
                    {/* <p>{crew.job}</p> */}
                  </div>
                <div><Trailer videoKey={movieDetails?.videos?.results?.[0]?.key} /></div>
                </div>
                <div className=' rounded-md border-[1px] border-m_gold bg-m_black/80 p-3 sm:p-6 flex flex-row sm:flex-col justify-between gap-3 w-full sm:w-[25%]'>
                  <div>
                    <div>
                      <h4 className='text-sm sm:text-base font-bold'>Status:</h4>
                      <p className=' text-sm mb-2'>{movieDetails.status}</p>
                    </div>
                    <div>
                      <h4 className='text-sm sm:text-base font-bold'>Original Language:</h4>
                      <p className=' text-sm'>{movieDetails.original_language ? getL(movieDetails.original_language) : ''}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h4 className='text-sm sm:text-base font-bold'>Budget:</h4>
                      <p className=' text-sm mb-2'>{formatMoney.format(movieDetails.budget)}</p>
                    </div>
                    <div>
                      <h4 className='text-sm sm:text-base font-bold'>Revenue:</h4>
                      <p className=' text-sm'>{formatMoney.format(movieDetails.revenue)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm sm:text-base font-bold'>Useful Links:</h4>
                    <div className=' flex gap-4 mt-3'>
                      <a className=' text-m_white hover:text-m_gold' href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`} target="_blank" rel="noopener noreferrer"><FaImdb size={35} /></a>
                      <a className=' text-m_white hover:text-m_gold' href={movieDetails.homepage} target="_blank" rel="noopener noreferrer"><FaGlobe size={35} /></a>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
         </div>
        
        <div>
          <div className=' p-8' style={{ overflowX: 'hidden' }}>
              <h2 className=' mb-2'>Cast:</h2>
              <div className=" relative flex items-center group">
          <IoIosArrowDropleftCircle onClick={() => {slideLeft(castSliderId)}} className=' absolute left-0 text-m_white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
          <div id={castSliderId} className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative mx-10'>
              {movieDetails?.credits?.cast.map((actor) => {
                  return(
                    <Cast
                      key={actor.id}
                      name={actor.name} 
                      character={actor.character} 
                      image={actor.profile_path}/>
                  )
                })
              }
              </div>
              <IoIosArrowDroprightCircle onClick={() => {slideRight(castSliderId)}} className=' absolute right-0 text-m_white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />

            </div>
          </div>
          <div className=' p-8' style={{ overflowX: 'hidden' }}> 
            <h2 className=' mb-2'>Production Crew:</h2>
            <div className=" relative flex items-center group">
          <IoIosArrowDropleftCircle onClick={() => {slideLeft(crewSliderId)}} className=' absolute left-0 text-m_white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
          <div id={crewSliderId} className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative mx-10'>

          {
                crewInfoArray.map((crew)=>{
                  return(
                    <Cast
                      key={crew.id}
                      name={crew.name} 
                      job={crew.titles} 
                      image={crew.image}/>
                  )
                })
              }
              </div>
              <IoIosArrowDroprightCircle onClick={() => {slideRight(crewSliderId)}} className=' absolute right-0 text-m_white opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />

            </div>

          </div>
          <div className=' p-8' style={{ overflowX: 'hidden' }}> 
            <h2 className=' mb-2'>Reviews:</h2>
            {
              movieDetails?.reviews?.results && movieDetails.reviews.results.map((review) => (
                <Reviews
                  key={review.id}
                  author={review.author} 
                  content={review.content} 
                  date={review.updated_at}
                  image={review.author_details.avatar_path}
                />
              ))
            }

          </div>
        </div>
      </div>
    </div>

  );
}