import React from 'react'

const InputBox = ({label, placeholder, onChange}) => {
  return (
    <div className='text-lg pt-3'>
        <div className='font-bold text-left text-md'>{label}</div>
        <div className='pt-1'>
            <input className='border border-gray-400 w-full px-2 py-1 rounded-lg bg-gray-100 focus:border-gray-400 focus:outline-none' type="text" placeholder={placeholder} onChange={onChange}/>
        </div>
    </div>
  )
}

export default InputBox