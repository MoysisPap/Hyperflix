import { useState } from 'react';
import defultImage from '../../../assets/default-user.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Reviews = ({ author, content, image, date }) => {
  const [showFullContent, setShowFullContent] = useState(false);
// console.log(defultImage);
  
const toggleContent = () => {
  setShowFullContent(!showFullContent);
};

  return (
    
    <div className=' flex justify-start items-start gap-4 border-[1px] border-m_gold rounded-xl p-8 mb-6'>
        <div className=' w-14 h-14 rounded-[50%] overflow-hidden'><img className="w-full h-full block object-cover" src={image ? `https://image.tmdb.org/t/p/w200/${image}` : defultImage} alt={author} /></div>
    
        
        <div className=' flex flex-col w-[90%]'>
            <h4 className=" text-m_white whitespace-normal font-open_sans text-xs md:text-sm font-bold ">{author}</h4>
            {/* <p className=" text-m_white whitespace-normal font-open_sans text-xs italic mb-3">{date}</p> */}
            <p className=" text-m_white whitespace-normal font-open_sans text-xs italic mb-3">{new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}</p>
            <p
          className={`text-m_white whitespace-normal font-open_sans text-xs md:text-sm ${
            showFullContent ? 'max-h-full' : 'max-h-16'
          } overflow-hidden`}
        >
          {content}
        </p>

        {content.length > 160 && (
          <button
            className='text-m_gold hover:underline focus:outline-none inline-flex items-center text-sm mt-4'
            onClick={toggleContent}
          >
            {showFullContent ? (
              <>
                <IoIosArrowUp className='mr-1' /> Read Less
              </>
            ) : (
              <>
                <IoIosArrowDown className='mr-1' /> Read More
              </>
            )}
          </button>
        )}
        
        </div>
              
    </div>

  )
}

export default Reviews;
