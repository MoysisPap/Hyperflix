import defultImage from '../../../assets/default-user.png'

const Cast = ({ name, character, image, job }) => {
// console.log(defultImage);
  

  return (
    
    <div className=" w-[140px] sm:w-[130px] md:w-[170px] lg:w-[210px]  inline-block p-2 shadow-lg">
              <img
  className="w-full h-full block object-cover object-top mb-2"
  src={image ? `https://image.tmdb.org/t/p/w200/${image}` : defultImage}
  alt={name}
/>
          
              
                <div className='flex flex-col gap-1 h-full'>
                <p className=" text-m_white whitespace-normal font-open_sans text-xs md:text-sm font-bold ">{name}</p>
                <p className=" text-m_white whitespace-normal font-open_sans text-xs md:text-sm">{character}</p>
                
                <p className=" text-m_white whitespace-normal font-open_sans text-xs md:text-sm">{job}</p>
                
              </div>
              
            </div>

  )
}

export default Cast;
