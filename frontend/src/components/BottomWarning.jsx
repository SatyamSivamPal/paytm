import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className='flex pt-7 justify-center'>
      <div className=''>
        {label}
      </div>
      <Link className='cursor-pointer text-blue-700 underline pl-1 hover:text-blue-400 ' to={to}>
        {buttonText}
      </Link>
    </div>

  )
}

export default BottomWarning