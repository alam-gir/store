import React from 'react'
import LoaderSVG from '../LoaderSVG'

const Pageloader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-black'>
        <LoaderSVG color={'fill-gray-600'} />
    </div>
  )
}

export default Pageloader