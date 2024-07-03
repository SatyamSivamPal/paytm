import React from 'react'


const CustomButton = ({ label, onClick }) => {


    return (
        <div className='pt-8'>
            <button className='p-3 text-white w-full bg-blue-400 rounded-lg hover:bg-blue-300' onClick={onClick}>{label}</button>
        </div>
    )
}

export default CustomButton