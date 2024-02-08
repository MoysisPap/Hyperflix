import React from 'react'

const Skeleton = ({ className }) => {
    return (
      <div className=" animate-pulse">
          <div className={` bg-m_lightGrey rounded-md ${className}`}></div>
      </div>
    )
  }

export default Skeleton