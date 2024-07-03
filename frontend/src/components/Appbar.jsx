import React, { useState } from 'react'
import logo from '../assets/paytm2.png'
import UserDetailsCard from "./UserDetailsCard"

const Appbar = () => {
    const email = (localStorage.getItem("name"));
    const spilted = email.split('@')
    const name = spilted[0];
    
    const [isCardVisible, setIsCardVisible] = useState(false);

    function toogleCardVisibility() {
        setIsCardVisible(!isCardVisible)
    }

    return (
        <div>
            <div className='flex justify-between p-3 text-xl font-semibold shadow'>
                <div className='flex items-center cursor-pointer'>
                    <img className='h-12' src={logo} alt="" />
                    <div className='pl-3'>
                        PayTM App
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='pr-4 text-xl cursor-pointer'>
                        {name.toUpperCase()}
                    </div>
                    <div className='bg-slate-300 rounded-full flex items-center justify-center text-2xl w-12 h-12 text-black cursor-pointer hover:bg-blue-400' onClick={toogleCardVisibility}>
                        {name[0].toUpperCase()}
                    </div>
                </div>
            </div>
            <div className='border shadow-xl shadow-gray-500/10'></div>
            {isCardVisible && <Overlay />}
            {isCardVisible && <UserDetailsCard toogleCardVisibility={toogleCardVisibility} setIsCardVisible={setIsCardVisible} isCardVisible={isCardVisible}/>}
        </div>

    )
}

const Overlay = () => {
    return <div className='fixed inset-0 bg-black opacity-50 z-10'></div>;
};

export default Appbar