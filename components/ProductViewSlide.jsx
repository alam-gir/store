import React from 'react'

const ProductViewSlide = ({image}) => {
  return (
    <div className='h-[20rem] sm:h-[28rem] bg-gradient-to-b from-[#D8F3DC] flex justify-center items-center'>
        <img src={image} alt="" className='h-full w-full object-contain' />
    </div>
  )
}

export default ProductViewSlide