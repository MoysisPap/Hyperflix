import { useNavigate } from "react-router-dom";
import BtnDetails from "../../ui-components/BtnDetails";
import Trailer from "../../ui-components/Trailer";
import Skeleton from "../../ui-components/Skeleton";

const HeroBanner = ({itemBanner}) => {
  const navigate = useNavigate();

  const navigateToMovie = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  if (!itemBanner) {
    // Render Skeleton while loading
    return (
      <div className="w-full h-[90vh] text-white font-open_sans relative">
        <div className="h-full w-full flex items-end">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
  }

  let releaseYear = new Date(itemBanner.release_date);

  let genres = [];
  for(let i in itemBanner.genres) {
      genres.push( itemBanner.genres[i].name );
  }

  //console.log(itemBanner)

  // flex items-end bg-gray-800 text-white h-[80vh] pt-20
  return itemBanner ? (
    <div className="w-full h-[90vh] text-white font-open_sans relative">
      <div
        className="h-full w-full flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${
            itemBanner.backdrop_path || itemBanner.poster_path
          })`,
          backgroundSize: 'cover',
        }}
      >
        {/* Dark overlay */}
        {/* <div className="bg-black opacity-50 z-10"></div> */}

        <div className="w-full h-full flex flex-col justify-end md:flex-row items-start md:items-end p-10 gap-5 bg-m_black/80">
          <div className='w-[30%] md:w-[300px] h-auto'>
            <img
              className=' block w-full h-full object-cover'
              src={`https://image.tmdb.org/t/p/w200${itemBanner.poster_path}`}
              alt={itemBanner.title}
            />
          </div>
          <div className="text-m_white font-open_sans font-medium w-full sm:w-[80%]">
            <div className='w-full'>
              
              <h1>
                {itemBanner.title}
              </h1>
              <p className="font-open_sans text-m_white italic text-sm mb-3 mt-2">
                <span>{releaseYear.getFullYear()}</span> .
                <span> {genres.join(', ')}</span>
              </p>
              <p className="w-full lg:w-2/3">{itemBanner.overview}</p>
            </div>
            <div className=" flex mt-4 gap-3">
              <BtnDetails onClick={() => navigateToMovie(itemBanner.id)} />  
              <Trailer videoKey={itemBanner?.videos?.results?.[0]?.key} />           
            </div>
          </div>

        </div>
      </div>
    </div>
  ) : 
  ('error')
};

export default HeroBanner;