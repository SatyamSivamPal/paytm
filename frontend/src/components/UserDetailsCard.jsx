import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const UserDetailsCard = ({ toogleCardVisibility, setIsCardVisible, isCardVisible }) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className='fixed top-20 right-10 bg-white shadow-lg rounded p-4 w-[26rem]  z-20 border-gray-400'>
            <h2 className='text-xl font-semibold mb-4'>Update Details</h2>
            <div className='mb-3'>
                <label className='block text-md font-medium text-gray-700'>
                    First Name
                </label>
                <input
                    type='text'
                    className='mt-1 pt-3 block w-full rounded-md border-gray-400 shadow-md focus:border-gray-200 focus:outline-none sm:text-sm p-2 bg-gray-200'
                    placeholder='John'
                    onChange={(e) => {
                        setFirst(e.target.value)
                    }}
                />
            </div>
            <div className='mb-4'>
                <label className='block text-md font-medium text-gray-700'>
                    Last Name
                </label>
                <input
                    type='email'
                    className='mt-1 pt-3 block w-full rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none p-2 bg-gray-200'
                    placeholder='Wick'
                    onChange={(e) => {
                        setLast(e.target.value)
                    }}
                />
            </div>
            <div className='mb-4'>
                <label className='block text-md font-medium text-gray-700'>
                    Password
                </label>
                <input
                    type='email'
                    className='mt-1 pt-3 block w-full rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none p-2 bg-gray-200'
                    placeholder='Enter your New Password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </div>
            <div className='flex justify-between pt-2'>
                <div>
                    <button type='button'
                        className='mr-4 bg-blue-500 px-3 py-2 rounded text-white'
                        onClick={() => {
                            localStorage.clear("token")
                            localStorage.clear("name")

                            navigate('/signup')
                        }}
                    >
                        Logout
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className='mr-4 bg-gray-200 px-4 py-2 rounded'
                        onClick={toogleCardVisibility}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white px-4 py-2 rounded'
                        onClick={() => {
                            axios.put("http://localhost:7000/api/v1/user/", {
                                firstName: first,
                                lastName: last,
                                password: password
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            }
                            )
                            alert("Updated successfully")
                            setIsCardVisible(!isCardVisible)
                        }}
                    >
                        Save
                    </button>
                </div>


            </div>
        </div>

    )
}

export default UserDetailsCard
