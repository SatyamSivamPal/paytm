import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    const token = localStorage.getItem("token")

    useEffect( () => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUsers(response.data.user)
        }
        )
    }, [filter])

    return (
        <div className='pt-7'>
            <div className='font-bold text-xl'>
                Users
            </div>
            <div className='pt-2'>
                <input className='border border-gray-300 rounded-md w-full p-1.5 focus:border-gray-400 focus:outline-none font-semibold' type="text" placeholder='Search users...' onChange={(e) => {
                    setFilter(e.target.value)
                }}/>
            </div>
            <div>
               {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}

export default Users


function User ({user}) {
    const letter = user.firstName[0];
    const navigate = useNavigate();
    return (
        <div className='flex justify-between pt-5'>
             <div className='flex items-center'>
                    <div className='bg-slate-300 rounded-full flex items-center justify-center text-2xl w-12 h-12 text-black cursor-pointer hover:bg-blue-400'>
                     {letter.toUpperCase()}
                    </div>
                    <div className='pl-2 text-lg'>
                        {user.firstName}
                    </div>
                </div>
                <div>
                    <button className='bg-blue-500 text-white rounded-lg p-3 w-[10rem] cursor-pointer hover:bg-blue-400' onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`)
                    }}>Send Money</button>
                </div>
        </div>
    )
}